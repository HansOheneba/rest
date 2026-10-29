"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a, button, [data-cursor]") as HTMLElement | null;
      setHover(Boolean(interactive));
      setLabel(interactive?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <motion.div style={{ x, y }} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-ember" />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ width: label ? 88 : hover ? 56 : 32, height: label ? 88 : hover ? 56 : 32 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/50 mix-blend-difference"
      >
        {label ? (
          <span className="absolute inset-0 grid place-items-center text-[11px] font-semibold uppercase tracking-wider text-cream">{label}</span>
        ) : null}
      </motion.div>
    </div>
  );
}
