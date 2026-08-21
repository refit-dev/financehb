"use client"

import { motion} from "framer-motion";
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'
import 'react-social-icons/linkedin'
import { useEffect, useRef } from "react";
import { Socials} from "@/constants";
import { SocialNetwork } from "@/types";
import { ArrowRight} from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons/component";
import Image from "next/image";
import { Button } from "./ui/button";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default  function MainPage(){
  
  const div = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🟢 1️⃣ Animace sekce “Čemu se věnuji”
      if (div.current) {
        gsap.fromTo(
          div.current.children,
          {
            opacity: 0,
            y: 100,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: div.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);
    return(
      <>
      <section className="flex flex-col w-full items-center p-8 lg:p-16 bg-gradient-to-r from-secondary via-secondary to-secondary/95 space-y-8  [clip-path:polygon(0_0,100%_0,100%_calc(100%-70px),0_100%)]" id="sluzby">
      <div ref={div} className="grid grid-cols-1 max-w-5xl">
        <h2 className={`text-white self-start font-bold my-5 tracking-wide text-5xl`}>Čemu se věnuji</h2>
     
          <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Vytvoření <span className="text-secondary-background">finančního plánu</span></h3>
            <p className="font-extralight text-base ">Chcete na své finance nahlížet z dlouhodobého hlediska? Vytvořím vám finanční plán, který vám padne. Při dlouhodobé spolupráci budu po vašem boku při řešení jakékoliv překážky. Není nad to mít partnera, který plánuje za vás, a hlavně pro vás.</p>
           </div>
       
          </div>

          <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Zajištění pravidelného <span className="text-secondary-background">pasivního příjmu</span></h3>
            <p className="font-extralight text-base ">Máte aktuálně větší obnos peněz a nechcete je nechat jen tak ležet v bance? Zajímá vás, jak to udělat, aby vám vaše peníze chytrou investicí přinášeli pravidelný pasivní příjem? Pomohu Vám zorientovat se v možnostech investování a zprostředkuji investiční produkty z nabídky spolupracujících poskytovatelů.</p>
           </div>
       
          </div>

           <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Zajištění příjmu a <span className="text-secondary-background">životního pojištění</span></h3>
            <p className="font-extralight text-base ">Pokud nemáte dostatek času nebo chuti přemýšlet nad svou budoucností, obraťte se na mě. Společně se podíváme na to, co je pro vaši budoucnost nejlepší. A díky mým zkušenostem nám to půjde hladce.</p>
           </div>
       
          </div>

           <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Investice do <span className="text-secondary-background">podílových fondů</span> a <span className="text-secondary-background">ETF</span> aj. </h3>
            <p className="font-extralight text-base ">Rozhodli jste se investovat do podílových fondů, ale nejste si v tomto oboru zcela jistí? Jsem zde pro vás, a díky tomu, že mám za sebou již řadu úspěšných investic, najdeme společně tu správnou cestu bez zbytečných komplikací.</p>
           </div>
       
          </div>

            <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Zajištění  <span className="text-secondary-background">majetku</span> a <span className="text-secondary-background">odpovědností</span> </h3>
            <p className="font-extralight text-base ">Potřebujete poradit se správou majetku? Spolehněte se na mě, protože nevynechám ani sebemenší detail. Nemáte rádi nemilá překvapení? Já také ne, proto nejen při plánování zajištění majetku postupuju s nejvyšší důsledností.</p>
           </div>
       
          </div>


          <div
  className="py-5 border-l border-l-white flex w-full flex-row ">
        <hr className="h-0.5 w-20 mt-4"/>
           <div className="flex flex-col text-white">
    <h3 className="text-xl font-bold">Konsolidace  <span className="text-secondary-background">dluhů</span></h3>
            <p className="font-extralight text-base ">Chcete najít cestu z tíživé finanční situace? Přenechte řešení svých dluhů na mně. Navrhnu skutečně efektivní plán na bezproblémovou konsolidaci dluhů, který vám přinese opravdu fungující řešení vaší situace.</p>
           </div>
       
          </div>
      </div>
      <Link href={"/sluzby"} className="w-fit mx-auto">
                                <Button
                                >
                                    Více služeb 
                        </Button>
                    </Link>
                     <div className="w-full h-10"/>
    </section>
 
    <section ref={ref} className="w-full flex flex-col px-4 py-16 overflow-hidden">
      <h2 className="font-semibold tracking-wide text-5xl text-right">
        Nechte peníze pracovat{" "}
        <span className="text-5xl font-bold underline underline-offset-4 decoration-secondary-background">
          za Vás
        </span>
      </h2>
      <h3 className="text-2xl text-secondary-background text-right">
        investorské aktuality a rady
      </h3>

      <div className="flex flex-col-reverse md:flex-row gap-8 my-12">
        
        {/* 🧱 Tile 2 */}
        <Link href="/paywall" target="_blank" className="w-full md:w-1/2">
          <div
            className="tile group border border-primary-foreground rounded-2xl p-8 space-y-5 
                       bg-gradient-to-tl from-secondary-background/20 to-slate-100 
                       transition-all duration-500 ease-out
                       hover:shadow-2xl hover:shadow-secondary-background/40 
                       hover:-translate-y-3 hover:scale-[1.03] 
                       hover:bg-gradient-to-br hover:from-white/90 hover:to-secondary-background/30
                       hover:backdrop-blur-sm"
          >
            <h3 className="text-2xl font-medium font-ibarra">
              📈{" "}
              <span className="text-secondary-background">
                Aktuality
              </span>{" "}
              z kapitálového trhu
            </h3>
            <p className="text-lg font-light">
              Získejte každý měsíc přehledné a srozumitelné informace přímo do
              své e-mailové schránky. Co hýbe trhy, kde se otevírají příležitosti
              a na co si dát pozor?
              <br />
              <br />
              Měsíční aktuality vám ušetří čas a udrží vás v obraze.
            </p>
            <Button className="transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              Chci získat info!
            </Button>
          </div>
        </Link>
        {/* 🧱 Tile 1 */}
        <Link href="/e-book" target="_blank" className="w-full md:w-1/2">
          <div
            className="tile group border border-primary-foreground rounded-2xl p-8 space-y-5 
                       bg-gradient-to-tl from-secondary-background/20 to-slate-100 
                       transition-all duration-500 ease-out
                       hover:shadow-2xl hover:shadow-secondary-background/40 
                       hover:-translate-y-3 hover:scale-[1.03] 
                       hover:bg-gradient-to-br hover:from-white/90 hover:to-secondary-background/30
                       hover:backdrop-blur-sm"
          >
            <h3 className="text-2xl font-medium font-ibarra">
              📘 E-book zdarma:{" "}
              <span className="text-secondary-background">
                Jak úspěšně a efektivně spořit na penzi
              </span>
            </h3>
            <p className="text-lg font-light">
              Ať už jste na začátku kariéry, v jejím plném tempu nebo se
              pomalu připravujete na důchod – nikdy není brzy (ani pozdě)
              začít budovat svou finanční budoucnost.
              <br />
              <br />
              Tento praktický{" "}
              <span className="font-medium underline underline-offset-4 decoration-secondary-background">
                e-book
              </span>{" "}
              vám ukáže, jak se vyhnout nejčastějším chybám a připravit se na
              důchod bez zbytečného stresu.
            </p>
            <Button className="transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              Stáhněte si e-book
            </Button>
          </div>
        </Link>

      </div>
    </section>
   
        </>
        )
}

export function SocialMedia(){
  const ref2 = useRef(null)
  return(
     <section  className="flex bg-primary-foreground flex-col w-full p-5 lg:p-16 space-y-8" >
        <div className="h-10"/>
        <h2 className={` text-center font-semibold tracking-wide  text-5xl`}>Sledujte <span className="font-bold underline underline-offset-4 decoration-secondary-background">mě</span></h2>
        <div
        ref={ref2}
        className="w-full grid grid-rows-4 gap-2 ">
          {Socials.map((s: SocialNetwork, id) => (
            <div key={id} className={` flex ${id % 2 ===0 ? "flex-row":"flex-row-reverse"} rounded-xl p-3  transition ease-in-out delay-100 duration-200 h-fit`}>
             
              <div className="w-full flex flex-col bg-white p-3 rounded-2xl md:w-1/2 hover:shadow-lg hover:shadow-secondary-background" >
            <div className="w-full flex flex-row  md:hidden gap-4 items-center">
<SocialIcon url={s.href} network={s.heading.toLowerCase()}/>
          <h3 className={`text-secondary-background text-2xl font-medium font-ibarra`}>{s.heading}</h3>
     
            </div>
            <div className="flex flex-row w-full">
            <div className="w-1/2 flex flex-col justify-center">
            <div className="w-full md:flex flex-row  hidden gap-4 items-center">
<SocialIcon url={s.href} network={s.heading.toLowerCase()}/>
          <h3 className={`text-secondary-background text-2xl font-medium font-ibarra`}>{s.heading}</h3>
     
            </div>
              
              <div className="flex flex-col m-3">
              
              <p className="sm:text-lg font-light">{s.text.slice(0,100)}</p>
              </div>
             
              </div>
               <Link className="h-fit w-1/2 my-auto" href={s.mediaSrc} target="_blank">
              {s.type === "img" ? <Image src={s.src} alt={s.heading + " Finance HB"} width={400} height={250}/>: <iframe src={s.src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className="mx-auto min-h-80 w-full"></iframe>}
              </Link>
              </div>
            </div>
             <div className="w-full hidden sm:flex sm:w-1/2 h-auto"></div>
            </div>
          ))}
        </div>
     
       
        </section>
  )
}

