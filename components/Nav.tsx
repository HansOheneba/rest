"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTable } from "@/lib/table";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "Story" },
  { href: "#events", label: "Events" },
  { href: "#visit", label: "Visit" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const items = useTable();
  const count = items.reduce((n, i) => n + i.qty, 0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400);
    setSolid(y > 60);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "bg-night/80 backdrop-blur-xl" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="text-2xl font-extrabold tracking-tighter">
          ASANKA<span className="text-ember">.</span>
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative overflow-hidden">
              <span className="block transition duration-300 group-hover:-translate-y-full">{l.label}</span>
              <span className="absolute inset-0 translate-y-full font-serif italic text-gold transition duration-300 group-hover:translate-y-0">{l.label}</span>
            </a>
          ))}
        </nav>
        <a href="#reserve" className="relative rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-night transition hover:bg-gold">
          Reserve
          {count > 0 ? (
            <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ember text-[10px] text-cream">
              {count}
            </motion.span>
          ) : null}
        </a>
      </div>
    </motion.header>
  );
}
