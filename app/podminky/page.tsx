import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: "Podmínky | Finance HB",
    description: "Regulatorní a právní informace k finančním službám nabízeným na webu financehb.cz – zprostředkovatel, rozsah oprávnění evidovaných ČNB a údaje o společnostech.",
}

type Company = {
    name: string
    rows: { label: string; value: string }[]
}

const companies: Company[] = [
    {
        name: "Financehb.cz s.r.o.",
        rows: [
            { label: "Právní forma", value: "Společnost s ručením omezeným" },
            { label: "IČO", value: "06752888" },
            { label: "Sídlo", value: "Nad Žlábkem 3758, 580 01 Havlíčkův Brod" },
            { label: "Spisová značka", value: "C 57025 vedená u Krajského soudu v Hradci Králové" },
            { label: "Vznik", value: "12. ledna 2018" },
        ],
    },
    {
        name: "EFEKTA Brokerpool a.s.",
        rows: [
            { label: "Právní forma", value: "Akciová společnost" },
            { label: "IČO", value: "29048770" },
            { label: "Sídlo", value: "Radlická 365/154, Radlice, 158 00 Praha 5" },
            { label: "Spisová značka", value: "B 20978 vedená u Městského soudu v Praze" },
            { label: "Vznik", value: "8. března 2010" },
        ],
    },
]

export default function PodminkyPage() {
    return (
        <main className="mx-auto max-w-5xl px-6 py-14 2xl:py-28 space-y-14 text-secondary">
            <header className="space-y-3">
                <h1 className="text-4xl font-medium underline underline-offset-8 decoration-secondary-background">
                    Podmínky
                </h1>
                <p className="text-lg font-light">
                    Regulatorní a právní informace k finančním službám propagovaným a nabízeným na webu www.financehb.cz.
                </p>
            </header>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">1. Kdo služby na tomto webu zprostředkovává</h2>
                <hr className="border-secondary border-[1.5px]" />
                <p className="text-lg leading-relaxed">
                    Finanční služby propagované a nabízené na tomto webu jsou v příslušném rozsahu zprostředkovávány
                    společností <strong className="font-medium">Financehb.cz s.r.o.</strong>, IČO 06752888,
                    a jejími oprávněnými pracovníky.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">2. Rozsah regulované činnosti</h2>
                <hr className="border-secondary border-[1.5px]" />
                <p className="text-lg leading-relaxed">
                    <strong className="font-medium">Petr Krajcigr</strong> vykonává regulovanou činnost jako vázaný
                    zástupce příslušného zastoupeného subjektu, zejména společnosti{" "}
                    <strong className="font-medium">EFEKTA Brokerpool a.s.</strong>, a to výhradně v rozsahu oprávnění
                    evidovaných Českou národní bankou.
                </p>
                <p className="text-lg leading-relaxed">
                    Jedná se zejména o zprostředkování finančních produktů a služeb v oblasti:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-base font-light marker:text-secondary-background">
                    <li>
                        <span className="font-medium">pojištění</span> – jako vázaný zástupce samostatného zprostředkovatele podle zákona č. 170/2018 Sb., o distribuci pojištění a zajištění,
                    </li>
                    <li>
                        <span className="font-medium">doplňkového penzijního spoření</span> – jako vázaný zástupce oprávněný k nabízení a zprostředkování doplňkového penzijního spoření podle zákona č. 427/2011 Sb., o doplňkovém penzijním spoření,

                    </li>
                    <li>
                        <span className="font-medium">spotřebitelských úvěrů</span> – jako vázaný zástupce samostatného zprostředkovatele podle zákona č. 257/2016 Sb., o spotřebitelském úvěru.
                    </li>
                    <li>
                        <span className="font-medium">investic</span> – jako vázaný zástupce investičního zprostředkovatele podle zákona č. 256/2004 Sb., o podnikání na kapitálovém trhu,
                    </li>
                </ul>
                
                <p className="border-l-4 border-secondary-background bg-primary-foreground p-5 text-lg font-light leading-relaxed">
                    Tuto skutečnost je možné ověřit v Seznamu regulovaných a registrovaných subjektů finančního trhu
                    České národní banky na{" "}
                    <Link
                        href="https://www.cnb.cz/cnb/jerrs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 decoration-secondary-background hover:text-secondary-foreground"
                    >
                        www.cnb.cz/cnb/jerrs
                    </Link>
                    , kde také najdete aktuální podrobnosti o registraci a jejím rozsahu.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-medium">3. Údaje o společnostech</h2>
                <hr className="border-secondary border-[1.5px]" />
                <p className="text-lg font-light">
                    Níže uvedené společnosti jsou samostatné právnické osoby s odlišnou rolí. Údaje se vztahují vždy
                    pouze ke společnosti, pod kterou jsou uvedeny.
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {companies.map((company) => (
                        <article
                            key={company.name}
                            className="flex flex-col rounded-xl border border-secondary/15 bg-primary-foreground p-6 shadow-md"
                        >
                            <h3 className="text-xl font-medium">{company.name}</h3>
                            
                            <dl className="mt-4 space-y-3 text-base font-light">
                                {company.rows.map((row) => (
                                    <div key={row.label} className="flex flex-col">
                                        <dt className="text-xs uppercase tracking-wider text-secondary/60">
                                            {row.label}
                                        </dt>
                                        <dd>{row.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </article>
                    ))}
                </div>
            </section>
            <section className="space-y-4">
                <h2 className="text-xl font-medium">4. Servisní poradenství</h2>
                <hr className="border-secondary border-[1.5px]" />
               
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                   
                        <article
                            className="flex flex-col rounded-xl border border-secondary/15 bg-primary-foreground p-6 shadow-md"
                        >
                            <h3 className="text-xl font-medium">Financehb Services s.r.o.</h3>
                            
                            <dl className="mt-4 space-y-3 text-base font-light">
                               
                                    <div  className="flex flex-col">
                                        <dt className="text-xs uppercase tracking-wider text-secondary/60">
                                            Právní forma
                                        </dt>
                                        <dd>Společnost s ručením omezeným</dd>
                                    </div>
                                    <div  className="flex flex-col">
                                        <dt className="text-xs uppercase tracking-wider text-secondary/60">
                                            IČO
                                        </dt>
                                        <dd>29698022</dd>
                                    </div>
                                    <div  className="flex flex-col">
                                        <dt className="text-xs uppercase tracking-wider text-secondary/60">
                                            Sídlo
                                        </dt>
                                        <dd>Nad Žlábkem 3758, 580 01 Havlíčkův Brod</dd>
                                    </div>
                                    <div  className="flex flex-col">
                                        <dt className="text-xs uppercase tracking-wider text-secondary/60">
                                            Spisová značka
                                        </dt>
                                        <dd>C 57025/KSHK Krajský soud v Hradci Králové</dd>
                                    </div>
                                    <div  className="flex flex-col">
                                        <dt className="text-xs uppercase tracking-wider text-secondary/60">
                                            Vznik
                                        </dt>
                                        <dd>18. června 2026</dd>
                                    </div>
                                
                            </dl>
                        </article>
                  
                </div>
            </section>
        </main>
    )
}
