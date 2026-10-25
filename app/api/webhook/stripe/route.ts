import Stripe from "stripe";
import { stripe } from "@/lib/utils";
import { headers } from "next/headers";
import { FullUser, RaynetResponse } from "@/types";
import { createInvoice } from "@/actions/users";
import { createTransport } from "nodemailer";
import { turso } from "@/database/client";
import { saveSmartmailing } from "@/actions/mail";

type PeriodItem = { price?: { id?: string } | null };
type PeriodField = 'current_period_start' | 'current_period_end';
type PlanItem = (items: PeriodItem[]) => PeriodItem | undefined;

// Typed like the removed field, which was also absent at runtime when Stripe omitted it.
function subscriptionPeriod(subscription: object, field: PeriodField, planItem?: PlanItem): number {
  const legacy: unknown = Reflect.get(subscription, field);
  if (typeof legacy === 'number') return legacy;
  const list: unknown = Reflect.get(subscription, 'items');
  const data: unknown = list && typeof list === 'object' ? Reflect.get(list, 'data') : undefined;
  const items = (Array.isArray(data) ? data : []).filter(
    (item): item is PeriodItem => typeof item === 'object' && item !== null,
  );
  const periods = new Set(items.map((item) => Reflect.get(item, field)));
  const chosen = periods.size === 1 ? items[0] : planItem?.(items);
  const value: unknown = chosen ? Reflect.get(chosen, field) : undefined;
  return (typeof value === 'number' ? value : undefined) as number;
}

function getSubscriptionPeriodStart(subscription: object, planItem?: PlanItem): number {
  return subscriptionPeriod(subscription, 'current_period_start', planItem);
}

function getSubscriptionPeriodEnd(subscription: object, planItem?: PlanItem): number {
  return subscriptionPeriod(subscription, 'current_period_end', planItem);
}

export async function POST(req: Request) {
  const body = await req.text();
  const raynetAPIUrl = "https://app.raynet.cz/api/v2/company/";
  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature") as string;
  let event: Stripe.Event;

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASSWORD,
    },
  });

  // 🧠 Webhook ověření
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: unknown) {
    console.error(`❌ Webhook Error: ${(error as Error).message}`);
    return new Response("Webhook error", { status: 400 });
  }

  console.log(`✅ Webhook event received: ${event.type}`);

  let session = event.data.object as Stripe.Checkout.Session;
  const stripeId = session.customer as string;

  // 🧠 Načtení uživatele podle stripe_id
  try {
    const getUserByStripeId = await turso.execute({
      sql: "SELECT * FROM users WHERE stripe_id = ?",
      args: [stripeId],
    });

    if (getUserByStripeId.rows.length === 0) {
      console.error("❌ User not found for stripe_id:", stripeId);
      return new Response("User not found", { status: 404 });
    }

    const untypedUser = getUserByStripeId.rows[0];

    const user: FullUser = {
      id: Number(untypedUser.id),
      first_name: String(untypedUser.first_name),
      last_name: String(untypedUser.last_name),
      email: String(untypedUser.email),
      raynet_id:untypedUser.raynet_id !== null ? Number(untypedUser.raynet_id) : null,
      is_mail_sub: Boolean(untypedUser.is_mail_sub),
      stripe_id: String(untypedUser.stripe_id),
    };

    switch (event.type) {
      case "checkout.session.completed":
        try {
          console.log("🟢 checkout.session.completed event triggered, RaynetId:", user.raynet_id);
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
          );

          if (!session.subscription) {
            console.error("❌ Subscription ID missing in session");
            return new Response("Subscription ID not found", { status: 400 });
          }

          const invoice = await stripe.invoices.retrieve(
            subscription.latest_invoice as string
          );

          const discount = session.total_details?.amount_discount ?? 0;
          const total = invoice.amount_due + discount / 100;
          const discountPer = (discount / (total / 100))/100;

          console.warn("Discount:",discountPer)
          if(discountPer <= 99.99){
             console.log(
            `🧾 Creating invoice for ${user.email} | total: ${total} | discount: ${discountPer}%`
          );
          const idoklad = await createInvoice(
            total,
            user.first_name,
            user.last_name,
            discountPer
          );
          if (idoklad.data) console.log("✅ iDoklad invoice created");
          else console.error("❌ iDoklad error", idoklad);
          }
          console.log("Raynet id:", user.raynet_id, ", typ:",typeof user.raynet_id)
          // 🧠 Raynet insert (jen pokud není ID)
          if (user.raynet_id === null || String(user.raynet_id) === "" || user.raynet_id === 0.0 || user.raynet_id === 0) {
            console.log("🟡 Raynet: Creating new company record...");
            const raynet = await fetch(raynetAPIUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Basic " +
                  Buffer.from(
                    process.env.RAYNET_EMAIL! +
                      ":" +
                      process.env.RAYNET_API_KEY!
                  ).toString("base64"),
                "X-Instance-Name": "financehb",
              },
              body: JSON.stringify({
                name: user.first_name + " " + user.last_name,
                firstName: user.first_name,
                lastName: user.last_name,
                rating: "A",
                state: "A_POTENTIAL",
                role: "A_SUBSCRIBER",
                addresses: [
                  {
                    address: {
                      name: "Sídlo klienta",
                      street: "",
                      city: "",
                      province: "",
                      zipCode: "",
                      country: "CZ",
                      lat: 0,
                      lng: 0,
                    },
                    contactInfo: {
                      email: user.email,
                      email2: "",
                      fax: "",
                      otherContact: "",
                      tel1: "",
                      tel1Type: "",
                      tel2: "",
                      tel2Type: "",
                      www: "",
                      doNotSendMM: false,
                    },
                  },
                ],
                tags: ["Mesicni akt z KPT placene"],
              }),
            });

            if (!raynet.ok) {
              console.error(`❌ Raynet request failed: ${raynet.status}`);
              throw new Error(`Raynet failed with status: ${raynet.status}`);
            }

            const raynet_id = (await raynet.json()) as RaynetResponse;
            console.log("✅ Raynet ID received:", raynet_id.data.id);

            const insert_r_id = await turso.execute({
              sql: "UPDATE users SET raynet_id = ? WHERE id = ?",
              args: [String(raynet_id.data.id), user.id],
            });

            if (insert_r_id.rowsAffected === 0) {
              console.error("❌ Failed to insert Raynet ID into DB");
              return new Response("DB error", { status: 500 });
            }

            const smartmailing = await saveSmartmailing(user.email, user.first_name, user.last_name, 35)

            console.log("Smartmailing:", smartmailing)
            await transporter.sendMail({
              from: process.env.FROM_EMAIL,
              to: process.env.FROM_EMAIL,
              subject: "Nové přihlášení - Měsíční akt z KPT placené",
              text: `Celé jméno: ${user.first_name} ${user.last_name}, Email: ${user.email}`,
            });
            console.log("✉️ Notification mail sent");
          }

          // 🧠 Insert subscription
          const insert_sub = await turso.execute({
            sql: `INSERT INTO subscriptions (user_id, 
                stripe_subscription_id,
                period_start,
                period_end,
                status,
                interval,
                plan_id,
                cena
                ) VALUES(?,?,?,?,?,?,?,?)`,
            args: [
              user.id,
              subscription.id as string,
              (getSubscriptionPeriodStart(subscription, (items) => items[0])) as number,
              (getSubscriptionPeriodEnd(subscription, (items) => items[0])) as number,
              subscription.status,
              subscription.items.data[0].plan.interval as string,
              subscription.items.data[0].plan.id as string,
              Number(subscription.items.data[0].plan.amount)/100
            ],
          });

          if (insert_sub.rowsAffected === 0) {
            console.error("❌ Failed to insert subscription to DB");
            return new Response("DB insert error", { status: 500 });
          }

          console.log("✅ Subscription inserted into DB");
        } catch (err) {
          console.error("❌ Unexpected error in checkout.session.completed:", err);
          return new Response("Unexpected error", { status: 500 });
        }
        break;

      case "customer.subscription.updated":
        try {
          console.log("🟡 customer.subscription.updated event");
          const sub = await stripe.subscriptions.retrieve(
            (event.data.object as Stripe.Subscription).id
          );

          if (sub.status === "active") {
            const update_sub = await turso.execute({
              sql: `UPDATE subscriptions SET 
                        stripe_subscription_id = ?,
                        period_start =?,
                        period_end=?,
                        status=?,
                        interval=?,
                        plan_id =?,
                        cena=?
                        WHERE user_id = ?`,
              args: [
                sub.id as string,
                (getSubscriptionPeriodStart(sub, (items) => items[0])) as number,
                (getSubscriptionPeriodEnd(sub, (items) => items[0])) as number,
                sub.status,
                sub.items.data[0].plan.interval as string,
                sub.items.data[0].plan.id as string,
                Number(sub.items.data[0].plan.amount)/100,
                user.id,
              ],
            });

            if (update_sub.rowsAffected === 0) {
              console.error("❌ Failed to update subscription in DB");
              return new Response("DB update error", { status: 500 });
            }
            console.log("✅ Subscription updated in DB");
          } else if (sub.status === "canceled") {
            const { rowsAffected } = await turso.execute({
              sql: "DELETE FROM subscriptions WHERE stripe_subscription_id = ?",
              args: [sub.id],
            });
            if (rowsAffected === 0) {
              console.error("❌ Failed to delete canceled subscription");
              return new Response("DB delete error", { status: 500 });
            }
            console.log("✅ Subscription deleted (canceled)");
          }
        } catch (err) {
          console.error("❌ Error in customer.subscription.updated:", err);
          return new Response("Unexpected error", { status: 500 });
        }
        break;

      case "customer.subscription.deleted":
        try {
          console.log("🟠 customer.subscription.deleted event");
          const sub = await stripe.subscriptions.retrieve(
            (event.data.object as Stripe.Subscription).id
          );
          const { rowsAffected } = await turso.execute({
            sql: "DELETE FROM subscriptions WHERE stripe_subscription_id = ?",
            args: [sub.id],
          });
          if (rowsAffected === 0) {
            console.error("❌ Failed to delete subscription from DB");
            return new Response("DB delete error", { status: 500 });
          }
          console.log("✅ Subscription deleted from DB");
        } catch (err) {
          console.error("❌ Error in customer.subscription.deleted:", err);
          return new Response("Unexpected error", { status: 500 });
        }
        break;

      default:
        console.warn(`⚠️ Unhandled event type: ${event.type}`);
        break;
    }
  } catch (err) {
    console.error("❌ Global webhook error:", err);
    return new Response("Server error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
