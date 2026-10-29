"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gallery, img } from "@/lib/data";

export default function Gallery() {
  const track = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) setLimit(el.scrollWidth - (el.parentElement?.clientWidth ?? 0));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="py-28">
      <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between px-5 sm:px-8">
        <h2 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
          Inside <span className="font-serif font-normal italic text-gold">Asanka</span>
        </h2>
        <p className="hidden text-sm text-cream/50 sm:block">Drag to explore →</p>
      </div>
      <div className="overflow-hidden px-5 sm:px-8">
        <motion.div
          ref={track}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.12}
          data-cursor="Drag"
          className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
        >
          {gallery.map((g, i) => (
            <motion.figure
              key={g.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              className={`group relative shrink-0 overflow-hidden rounded-[28px] ${i % 3 === 0 ? "h-[58vh] w-[78vw] sm:w-[42vw]" : i % 3 === 1 ? "mt-16 h-[44vh] w-[64vw] sm:w-[28vw]" : "h-[50vh] w-[70vw] sm:w-[34vw]"}`}
            >
              <Image src={img(g.id)} alt={g.caption} fill draggable={false} sizes="(min-width: 640px) 42vw, 78vw" className="pointer-events-none object-cover transition duration-700 group-hover:scale-105" />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-night/60 px-4 py-1.5 text-xs backdrop-blur">{g.caption}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
