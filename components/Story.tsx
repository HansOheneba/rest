"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { img, story } from "@/lib/data";

function Card({ i, progress, item }: { i: number; progress: MotionValue<number>; item: (typeof story)[number] }) {
  const start = i / story.length;
  const scale = useTransform(progress, [start, 1], [1, 1 - (story.length - i) * 0.05]);
  const imgScale = useTransform(progress, [start, start + 1 / story.length], [1.3, 1]);

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center px-5">
      <motion.div
        style={{ scale, top: `calc(8vh + ${i * 28}px)`, backgroundColor: item.color }}
        className="relative grid w-full max-w-6xl origin-top overflow-hidden rounded-[40px] text-night md:grid-cols-2"
      >
        <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.25em]">{item.kicker}</p>
          <div>
            <h3 className="text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-6xl">{item.title}</h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-night/75">{item.body}</p>
          </div>
        </div>
        <div className="relative h-72 overflow-hidden md:h-[62vh]">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <Image src={img(item.image, 1400)} alt={item.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="story" className="relative scroll-mt-0">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <p className="text-sm uppercase tracking-[0.3em] text-ember">Our story</p>
        <h2 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-7xl">
          Named after the clay bowl <span className="font-serif font-normal italic text-gold">every Ghanaian kitchen</span> knows.
        </h2>
      </div>
      <div ref={ref}>
        {story.map((s, i) => (
          <Card key={s.title} i={i} item={s} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
