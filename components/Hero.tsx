"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { heroDishes, img } from "@/lib/data";
import OpenStatus from "./OpenStatus";
import Magnetic from "./Magnetic";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [dish, setDish] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const t = setInterval(() => setDish((d) => (d + 1) % heroDishes.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-28">
      {/* warm glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[70vw] w-[70vw] -translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />

      {/* rotating plate */}
      <motion.div
        style={{ rotate: plateRotate, y: plateY }}
        className="absolute right-[-18vw] top-[12vh] aspect-square w-[70vw] sm:right-[-6vw] sm:w-[46vw] lg:w-[38vw]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border-[10px] border-coal shadow-[0_40px_120px_rgba(232,87,42,0.35)]">
          <AnimatePresence initial={false}>
            <motion.div
              key={dish}
              initial={{ opacity: 0, scale: 1.2, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image src={img(heroDishes[dish])} alt="Signature dish" fill priority sizes="(min-width: 1024px) 38vw, 70vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <OpenStatus />
        <p className="mt-6 max-w-sm font-serif text-2xl italic leading-snug text-cream/80 sm:text-3xl">
          Ghanaian food, cooked over coal and served to share.
        </p>
      </div>

      <motion.h1
        style={{ scale: titleScale, opacity: titleOpacity, backgroundImage: `url(${img("1517248135467-4c7edcad34c4")})` }}
        className="relative z-10 mt-6 origin-bottom-left animate-[pan_18s_ease-in-out_infinite] bg-[length:160%] bg-clip-text px-3 text-[23vw] sm:text-[25vw] font-extrabold leading-[0.8] tracking-[-0.06em] [filter:drop-shadow(0_0_40px_rgba(232,87,42,0.35))_brightness(1.25)] text-transparent [-webkit-background-clip:text]"
        aria-label="Asanka"
      >
        ASANKA
      </motion.h1>

      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-7xl flex-wrap items-center justify-between gap-6 px-5 sm:px-8">
        <p className="max-w-md text-sm text-cream/60">
          12 Oxford Street, Osu • Lunch, dinner &amp; late bar • Highlife every Friday
        </p>
        <div className="flex items-center gap-4">
          <a href="#menu" className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline">
            See the menu <ArrowDownRight className="h-4 w-4" />
          </a>
          <Magnetic>
            <a href="#reserve" data-cursor="Book" className="grid h-28 w-28 place-items-center rounded-full bg-ember text-center text-sm font-bold uppercase leading-tight tracking-wide text-night transition hover:bg-gold">
              Book a<br />table
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
