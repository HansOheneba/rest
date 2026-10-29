"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { events, img } from "@/lib/data";

function EventCard({ e, i }: { e: (typeof events)[number]; i: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.12, duration: 0.7 }}
      style={{ perspective: 1400 }}
      className="h-[460px]"
    >
      <motion.button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        onHoverStart={() => setFlipped(true)}
        onHoverEnd={() => setFlipped(false)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        style={{ transformStyle: "preserve-3d" }}
        data-cursor="Flip"
        className="relative h-full w-full text-left"
      >
        <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 overflow-hidden rounded-[32px]">
          <Image src={img(e.image, 900)} alt={e.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
          <div className="absolute inset-x-6 bottom-6">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{e.day}</p>
            <h3 className="mt-2 text-4xl font-extrabold tracking-tight">{e.title}</h3>
            <p className="mt-2 text-sm text-cream/75">{e.blurb}</p>
          </div>
        </div>
        <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0 flex flex-col justify-between rounded-[32px] bg-ember p-8 text-night">
          <p className="text-xs font-bold uppercase tracking-[0.25em]">{e.day}</p>
          <div>
            <h3 className="font-serif text-5xl italic">{e.title}</h3>
            <p className="mt-4 text-lg leading-relaxed">{e.detail}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold"><RotateCcw className="h-4 w-4" /> Book it below</span>
        </div>
      </motion.button>
    </motion.div>
  );
}

export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-28 sm:px-8">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-ember">What&apos;s on</p>
        <h2 className="mt-4 text-5xl font-extrabold leading-[0.95] tracking-tighter sm:text-7xl">
          Come for dinner. <span className="font-serif font-normal italic text-gold">Stay for the band.</span>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {events.map((e, i) => (
          <EventCard key={e.title} e={e} i={i} />
        ))}
      </div>
    </section>
  );
}
