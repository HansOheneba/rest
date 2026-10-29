"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, User } from "lucide-react";
import { hours } from "@/lib/data";
import { table, useMounted, useTable } from "@/lib/table";

const steps = ["Guests", "Date", "Time", "Details"] as const;
const occasions = ["Just dinner", "Birthday", "Date night", "Business", "Celebration"];

function upcoming(n: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setUTCHours(12, 0, 0, 0);
  for (let i = 0; out.length < n && i < 30; i++) {
    const day = new Date(d);
    day.setUTCDate(d.getUTCDate() + i);
    if (hours[day.getUTCDay()]) out.push(day);
  }
  return out;
}

function slotsFor(date: Date) {
  const h = hours[date.getUTCDay()];
  if (!h) return [];
  const out: { time: string; full: boolean }[] = [];
  for (let t = h[0]; t <= h[1] - 1.5; t += 0.5) {
    const hh = Math.floor(t);
    const label = `${hh > 12 ? hh - 12 : hh}:${t % 1 ? "30" : "00"}${hh >= 12 ? "pm" : "am"}`;
    // deterministic "busy" slots so the grid looks lived-in
    out.push({ time: label, full: (date.getUTCDate() * 7 + Math.round(t * 2)) % 5 === 0 });
  }
  return out;
}

export default function Reserve() {
  const mounted = useMounted();
  const preorder = useTable();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [guests, setGuests] = useState(2);
  const [dateIdx, setDateIdx] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState(occasions[0]);
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const dates = useMemo(() => (mounted ? upcoming(14) : []), [mounted]);
  const date = dates[dateIdx];
  const slots = date ? slotsFor(date) : [];
  const preTotal = preorder.reduce((n, i) => n + i.qty * i.price, 0);

  const canNext = [guests > 0, Boolean(date), Boolean(time), name.trim().length > 1 && phone.replace(/\D/g, "").length >= 9][step];

  const go = (s: number) => {
    setDir(s > step ? 1 : -1);
    setStep(s);
  };

  const confirm = () => {
    const ref = `ASK-${(date!.getUTCDate() * 100 + guests * 7 + name.length * 13).toString(36).toUpperCase()}${time!.replace(/\D/g, "")}`;
    setConfirmed(ref);
  };

  const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-GB", { timeZone: "UTC", ...opts });

  return (
    <section id="reserve" className="relative scroll-mt-20 overflow-hidden bg-cream py-28 text-night">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold/40 blur-[100px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-ember">Reservations</p>
          <h2 className="mt-4 text-6xl font-extrabold leading-[0.9] tracking-tighter sm:text-8xl">
            Save us <span className="font-serif font-normal italic text-ember">a seat.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-night/65">
            Tables for up to 12 online. For bigger groups or the whole terrace, call us on 030 270 0000.
          </p>
          {preorder.length ? (
            <div className="mt-8 max-w-md rounded-3xl bg-night p-5 text-cream">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Pre-ordered for your table</p>
              <ul className="mt-3 space-y-1 text-sm">
                {preorder.map((i) => <li key={i.name} className="flex justify-between"><span>{i.qty} × {i.name}</span><span>₵{i.qty * i.price}</span></li>)}
              </ul>
              <p className="mt-3 border-t border-cream/15 pt-3 text-right font-serif text-xl">₵{preTotal}</p>
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[520px] rounded-[40px] bg-white p-6 shadow-[0_40px_100px_-40px_rgba(17,13,10,0.5)] sm:p-10">
          <AnimatePresence mode="wait">
            {confirmed ? (
              <motion.div key="ticket" initial={{ opacity: 0, rotateX: -60, y: 40 }} animate={{ opacity: 1, rotateX: 0, y: 0 }} transition={{ type: "spring", stiffness: 120, damping: 16 }} style={{ transformPerspective: 1000 }} className="flex h-full flex-col items-center justify-center text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="grid h-16 w-16 place-items-center rounded-full bg-ember text-cream">
                  <Check className="h-8 w-8" />
                </motion.div>
                <div className="relative mt-8 w-full max-w-sm rounded-3xl bg-night p-6 text-left text-cream">
                  <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />
                  <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white" />
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">Table confirmed</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight">{name.split(" ")[0]}, party of {guests}</p>
                  <div className="my-5 border-t border-dashed border-cream/25" />
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div><dt className="text-cream/50">Date</dt><dd className="mt-1 font-semibold">{fmt(date!, { weekday: "short", day: "numeric", month: "short" })}</dd></div>
                    <div><dt className="text-cream/50">Time</dt><dd className="mt-1 font-semibold">{time}</dd></div>
                    <div><dt className="text-cream/50">Occasion</dt><dd className="mt-1 font-semibold">{occasion}</dd></div>
                    <div><dt className="text-cream/50">Ref</dt><dd className="mt-1 font-mono font-semibold text-gold">{confirmed}</dd></div>
                  </dl>
                  {preorder.length ? <p className="mt-4 text-xs text-cream/60">+ {preorder.reduce((n, i) => n + i.qty, 0)} dishes pre-ordered (₵{preTotal})</p> : null}
                </div>
                <button type="button" onClick={() => { setConfirmed(null); setStep(0); setTime(null); table.clear(); }} className="mt-8 text-sm font-semibold underline underline-offset-4">
                  Make another booking
                </button>
              </motion.div>
            ) : (
              <motion.div key="wizard" exit={{ opacity: 0 }}>
                {/* progress */}
                <div className="mb-8 flex items-center gap-2">
                  {steps.map((s, i) => (
                    <button key={s} type="button" disabled={i > step} onClick={() => go(i)} className="flex-1 text-left">
                      <div className="h-1.5 overflow-hidden rounded-full bg-night/10">
                        <motion.div className="h-full bg-ember" animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
                      </div>
                      <span className={`mt-2 block text-xs font-semibold ${i === step ? "text-night" : "text-night/40"}`}>{s}</span>
                    </button>
                  ))}
                </div>

                <div className="relative min-h-[300px]">
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={step}
                      custom={dir}
                      initial={{ x: dir * 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: dir * -60, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step === 0 ? (
                        <div>
                          <p className="text-2xl font-bold">How many of you?</p>
                          <div className="mt-10 flex items-center justify-center gap-8">
                            <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid h-14 w-14 place-items-center rounded-full border-2 border-night/15 hover:border-night"><Minus /></button>
                            <motion.span key={guests} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-28 text-center text-8xl font-extrabold tabular-nums tracking-tighter">
                              {guests}
                            </motion.span>
                            <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(12, g + 1))} className="grid h-14 w-14 place-items-center rounded-full border-2 border-night/15 hover:border-night"><Plus /></button>
                          </div>
                          <div className="mt-8 flex justify-center gap-1">
                            {Array.from({ length: guests }, (_, i) => (
                              <motion.span key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}><User className="h-5 w-5 text-ember" /></motion.span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {step === 1 ? (
                        <div>
                          <p className="text-2xl font-bold">Pick a day</p>
                          <p className="mt-1 text-sm text-night/50">Closed Mondays.</p>
                          <div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
                            {dates.map((d, i) => (
                              <button key={d.toISOString()} type="button" onClick={() => { setDateIdx(i); setTime(null); }} className={`flex flex-col items-center rounded-2xl py-3 transition ${i === dateIdx ? "bg-night text-cream" : "bg-night/5 hover:bg-night/10"}`}>
                                <span className="text-[10px] font-semibold uppercase">{fmt(d, { weekday: "short" })}</span>
                                <span className="text-2xl font-extrabold">{fmt(d, { day: "numeric" })}</span>
                                <span className="text-[10px] opacity-60">{fmt(d, { month: "short" })}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {step === 2 ? (
                        <div>
                          <p className="text-2xl font-bold">{date ? fmt(date, { weekday: "long", day: "numeric", month: "long" }) : ""}</p>
                          <p className="mt-1 text-sm text-night/50">Struck-through times are fully booked.</p>
                          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {slots.map((s) => (
                              <button key={s.time} type="button" disabled={s.full} onClick={() => setTime(s.time)} className={`rounded-xl py-2.5 text-sm font-semibold transition ${s.full ? "cursor-not-allowed text-night/25 line-through" : time === s.time ? "bg-ember text-cream" : "bg-night/5 hover:bg-night/10"}`}>
                                {s.time}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {step === 3 ? (
                        <div className="space-y-4">
                          <p className="text-2xl font-bold">Who should we expect?</p>
                          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-2xl bg-night/5 px-5 py-4 outline-none ring-ember focus:ring-2" />
                          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" inputMode="tel" className="w-full rounded-2xl bg-night/5 px-5 py-4 outline-none ring-ember focus:ring-2" />
                          <div className="flex flex-wrap gap-2">
                            {occasions.map((o) => (
                              <button key={o} type="button" onClick={() => setOccasion(o)} className={`rounded-full px-4 py-2 text-sm transition ${occasion === o ? "bg-night text-cream" : "bg-night/5 hover:bg-night/10"}`}>{o}</button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="inline-flex items-center gap-2 text-sm font-semibold disabled:opacity-0">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => (step === steps.length - 1 ? confirm() : go(step + 1))}
                    className="inline-flex items-center gap-2 rounded-full bg-night px-7 py-3.5 text-sm font-bold text-cream transition enabled:hover:bg-ember disabled:opacity-30"
                  >
                    {step === steps.length - 1 ? "Confirm table" : "Continue"} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
