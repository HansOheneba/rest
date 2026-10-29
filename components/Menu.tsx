"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Flame, Leaf, Minus, Plus, Star, X } from "lucide-react";
import { img, menu, type Dish } from "@/lib/data";
import { table, useTable } from "@/lib/table";

type Filter = "all" | "V" | "GF" | "mild";

function Spice({ level }: { level: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`Spice level ${level} of 3`}>
      {[1, 2, 3].map((n) => (
        <Flame key={n} className={`h-3.5 w-3.5 ${n <= level ? "fill-ember text-ember" : "text-cream/15"}`} />
      ))}
    </span>
  );
}

export default function Menu() {
  const [course, setCourse] = useState(menu[0].id);
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<Dish | null>(null);
  const [trayOpen, setTrayOpen] = useState(false);
  const items = useTable();

  // floating preview that trails the cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 150, damping: 18 });
  const py = useSpring(my, { stiffness: 150, damping: 18 });

  const dishes = menu
    .find((c) => c.id === course)!
    .dishes.filter((d) =>
      filter === "all" ? true : filter === "mild" ? d.spice <= 1 : d.tags.includes(filter),
    );

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <section
      id="menu"
      className="relative scroll-mt-20 py-28"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-ember">The menu</p>
            <h2 className="mt-4 text-6xl font-extrabold leading-[0.9] tracking-tighter sm:text-8xl">
              Order <span className="font-serif font-normal italic text-gold">everything.</span>
              <br />
              Share it all.
            </h2>
          </div>
          <p className="max-w-sm text-cream/60">
            Hover a dish to see it. Tap the plus to add it to your table, and we will have it
            ready when you arrive.
          </p>
        </div>

        {/* Course tabs */}
        <div className="mt-14 flex flex-wrap gap-2 border-b border-cream/10 pb-4">
          {menu.map((c) => (
            <button key={c.id} type="button" onClick={() => setCourse(c.id)} className="relative px-4 py-2 text-sm font-semibold sm:text-base">
              {course === c.id ? (
                <motion.span layoutId="course" className="absolute inset-0 rounded-full bg-cream" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              ) : null}
              <span className={`relative ${course === c.id ? "text-night" : "text-cream/60 hover:text-cream"}`}>{c.label}</span>
            </button>
          ))}
          <div className="ml-auto flex flex-wrap gap-2 text-xs">
            {(
              [
                ["all", "All"],
                ["V", "Vegetarian"],
                ["GF", "Gluten-free"],
                ["mild", "Mild"],
              ] as const
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                className={`rounded-full border px-3 py-1.5 transition ${filter === k ? "border-gold bg-gold/15 text-gold" : "border-cream/15 text-cream/60 hover:border-cream/40"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes */}
        <ul className="mt-2" onMouseLeave={() => setHovered(null)}>
          <AnimatePresence mode="popLayout">
            {dishes.map((d, i) => {
              const qty = items.find((x) => x.name === d.name)?.qty ?? 0;
              return (
                <motion.li
                  key={d.name}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHovered(d)}
                  className="group grid grid-cols-[72px_1fr_auto] items-center gap-4 border-b border-cream/10 py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
                >
                  {/* inline thumbnail on touch screens */}
                  <div className="relative h-[72px] w-[72px] overflow-hidden rounded-2xl sm:hidden">
                    <Image src={img(d.image, 300)} alt={d.name} fill sizes="72px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold tracking-tight transition duration-300 group-hover:translate-x-3 group-hover:text-gold sm:text-4xl">
                        {d.name}
                      </h3>
                      <Spice level={d.spice} />
                      {d.tags.includes("V") ? <Leaf className="h-4 w-4 text-green-400" aria-label="Vegetarian" /> : null}
                      {d.tags.includes("Chef's pick") ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-ember/15 px-2 py-0.5 text-[11px] text-ember">
                          <Star className="h-3 w-3 fill-current" /> Chef&apos;s pick
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-cream/55 transition duration-300 group-hover:translate-x-3">{d.desc}</p>
                  </div>
                  <div className="col-start-3 flex items-center gap-3 sm:col-start-auto">
                    <span className="font-serif text-2xl text-cream/90 sm:text-3xl">₵{d.price}</span>
                    <div className="flex items-center gap-1 rounded-full border border-cream/15 p-1">
                      {qty > 0 ? (
                        <>
                          <button type="button" aria-label={`Remove ${d.name}`} onClick={() => table.remove(d.name)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-cream/10">
                            <Minus className="h-4 w-4" />
                          </button>
                          <motion.span key={qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-4 text-center text-sm tabular-nums">
                            {qty}
                          </motion.span>
                        </>
                      ) : null}
                      <button
                        type="button"
                        aria-label={`Add ${d.name}`}
                        data-cursor="Add"
                        onClick={() => table.add(d.name, d.price)}
                        className="grid h-8 w-8 place-items-center rounded-full bg-cream text-night transition hover:bg-gold"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        {dishes.length === 0 ? <p className="py-16 text-center font-serif text-2xl italic text-cream/50">Nothing here with that filter. Try another course.</p> : null}
      </div>

      {/* Cursor-following preview, desktop only */}
      <motion.div
        style={{ x: px, y: py }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden [@media(hover:hover)]:sm:block"
      >
        <AnimatePresence>
          {hovered ? (
            <motion.div
              key={hovered.name}
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 4 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 8 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative -ml-36 -mt-48 h-64 w-52 overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image src={img(hovered.image, 600)} alt="" fill sizes="208px" className="object-cover" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      {/* Table tray */}
      <AnimatePresence>
        {count > 0 ? (
          <motion.div initial={{ y: 140 }} animate={{ y: 0 }} exit={{ y: 140 }} transition={{ type: "spring", stiffness: 260, damping: 28 }} className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
            <AnimatePresence>
              {trayOpen ? (
                <motion.ul initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mb-2 max-h-64 space-y-2 overflow-auto rounded-3xl bg-coal p-4 shadow-2xl ring-1 ring-cream/10">
                  {items.map((i) => (
                    <li key={i.name} className="flex items-center justify-between text-sm">
                      <span>{i.qty} × {i.name}</span>
                      <span className="flex items-center gap-3">
                        ₵{i.qty * i.price}
                        <button type="button" aria-label={`Remove ${i.name}`} onClick={() => table.remove(i.name)} className="rounded-full p-1 text-cream/50 hover:bg-cream/10 hover:text-cream"><X className="h-3.5 w-3.5" /></button>
                      </span>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
            <div className="flex items-center gap-3 rounded-full bg-cream p-2 pl-5 text-night shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <button type="button" onClick={() => setTrayOpen((v) => !v)} className="flex-1 text-left text-sm">
                <span className="font-bold">{count} on your table</span> · ₵{total}
              </button>
              <a href="#reserve" className="rounded-full bg-ember px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-night">
                Book &amp; pre-order
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
