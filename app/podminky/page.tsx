"use client";
import Link from 'next/link'
import React from 'react'

export default function PodminkyPage() {
    return (
        <main className="flex 2xl:py-28 flex-col items-center p-8 text-xl space-y-3">
            <h1 className='text-2xl'>
                Finanční služby propagované a nabízené na tomto webu poskytuje společnost Financehb Services s.r.o, IČO: 29698022, a zde uvedení poradci jako fyzické osoby: Petr Krajcigr, kteří jsou v oblasti:
            </h1>
            <hr className='w-full border-secondary border-[1.5px]' />
            <ul className='list-disc px-4'>
                <li>pojištění registrovaní podle zákona č. 170/2018 Sb. jako vázaní zástupci samostatného zprostředkovatele pojištění,</li>
                <li>doplňkového penzijního spoření podle zákona č. 256/2004 Sb. jako vázaní zástupci investičního zprostředkovatele,</li>
                <li>spotřebitelských úvěrů podle zákona č. 257/2016 Sb. jako vázaní zástupci samostatného zprostředkovatele spotřebitelského úvěru,
                    společnosti EFEKTA Brokerpool a.s. Základní údaje o firmě 
                    <ul className='list-disc px-4'>
                        <li>
                            Forma: Akciová společnost
                        </li>
                        <li>Sídlo. Radlická 365/154, 158 00 Praha 5 - Radlice</li>
                        <li>Vznik: 8. března 2010</li>
                        <li>Spisová značka: B 20978 vedená u Městského soudu v Praze</li>
                        <li>IČO: 29048770</li>
                        <li>DIČ: CZ29048770</li>
                    </ul>
                    Tuto skutečnost je možné ověřit v Seznamu regulovaných a registrovaných subjektů finančního trhu České národní banky na <Link className='underline hover:text-secondary-foreground visited:text-secondary-foreground' href={"http://www.cnb.cz/cnb/jerrs"}>http://www.cnb.cz/cnb/jerrs</Link>, kde také najdete aktuální podrobnosti o registraci a jejím rozsahu.</li>
            </ul>
        </main>
    )
}

