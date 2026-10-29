"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

function Row({ items, baseVelocity }: { items: string[]; baseVelocity: number }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) dir.current = -1;
    else if (factor.get() > 0) dir.current = 1;
    move += dir.current * move * factor.get();
    base.set(base.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x }} className="flex shrink-0 gap-10 pr-10">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className={i % 2 ? "font-serif italic text-gold" : "font-extrabold uppercase tracking-tight"}>{t}</span>
            <span className="text-ember">✺</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Signature dishes" className="-rotate-2 border-y border-cream/10 bg-coal py-6 text-5xl sm:text-7xl">
      <Row items={["Suya short rib", "Kelewele", "Palm-nut salmon", "Smoky jollof", "Bofrot", "Sobolo spritz"]} baseVelocity={-3} />
      <div className="h-4" />
      <Row items={["Coal fired", "Hand ground", "Made to share", "Highlife Fridays", "Osu, Accra"]} baseVelocity={2} />
    </section>
  );
}
