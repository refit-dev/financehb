"use client"

import { Mouse } from "lucide-react"
import { Button } from "../ui/button"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image";

export default function Header(){
    const frame = useRef<HTMLDivElement>(null)
    const mouse = useRef<SVGSVGElement>(null)
    useEffect(() => {
        if (!frame.current || !mouse.current) return;

        gsap.fromTo(frame.current.children,{
            opacity: 0,
            y:-500
        }, {
            opacity:1,
            y:0,
            duration:1,
            ease: "power2.out",
            stagger: 0.3
        })
        const tl = gsap.timeline({repeat: -1, repeatDelay: 3})
        tl.to(mouse.current,{
            y:-50,
            duration:0.4,
            ease: "power1.in"
        })
       tl.to(
  mouse.current,
  {
    y: 0,
    duration: 1.2,
    ease: "bounce.out",
  }
);
    }, [])
    return(
<header className="w-full text-white flex flex-col relative min-h-screen items-center justify-center">
    {/* Obrázek na pozadí */}
    <Image
        src="/petr.jpg"
        alt=""
        fill
        priority
        className="object-cover -z-20"
    />
    {/* Barevný overlay přes obrázek */}
    <div className="absolute inset-0 bg-secondary/70 -z-10" />

    <div ref={frame} className="flex space-y-14 flex-col items-center text-center">
        <h1 className="text-5xl sm:text-6xl font-bold">
            Dovedu Vás k finanční{" "}
            <span className="text-secondary-background">nezávislosti</span>
        </h1>
        <div className="flex flex-col">
            <p className="text-xl">
                Jmenuji se Petr Krajcigr, zabývám se <br />
                <span className="font-bold">finančním poradenstvím</span><br />
                a <span className="font-bold">správě portfolií</span>.
            </p>
        </div>
        <Link href={"/sluzby#calendly"} target="_blank">
            <Button>Domluvit schůzku</Button>
        </Link>
        <div className="flex flex-col space-y-3 items-center">
            <Mouse ref={mouse} className="size-14" strokeWidth={1.5} />
            <span className="text-lg">Pokračujte dále</span>
        </div>
    </div>
</header>
    )
}