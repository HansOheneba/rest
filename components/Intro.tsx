"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const letters = "ASANKA".split("");

export default function Intro() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="fixed inset-0 z-[80] grid place-items-center bg-ember text-night"
        >
          <div className="flex overflow-hidden font-sans text-[18vw] font-extrabold leading-none tracking-tighter sm:text-[12vw]">
            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-10 font-serif text-xl italic"
          >
            Osu, Accra — since 2019
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
