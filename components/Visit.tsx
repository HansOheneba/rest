"use client";

import { AtSign, MapPin, Phone } from "lucide-react";
import { dayNames, hours } from "@/lib/data";
import { useMounted } from "@/lib/table";

const order = [2, 3, 4, 5, 6, 0, 1];
const fmt = (h: number) => (h === 24 ? "midnight" : h > 12 ? `${h - 12}pm` : h === 12 ? "12pm" : `${h}am`);

export default function Visit() {
  const mounted = useMounted();
  const today = mounted ? new Date().getUTCDay() : -1;

  return (
    <footer id="visit" className="scroll-mt-20 bg-night">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <p className="text-6xl font-extrabold tracking-tighter">
            ASANKA<span className="text-ember">.</span>
          </p>
          <p className="mt-4 max-w-xs font-serif text-xl italic text-cream/60">A modern Ghanaian kitchen &amp; bar.</p>
        </div>
        <div className="space-y-4 text-cream/80">
          <a href="https://maps.google.com/?q=Oxford+Street+Osu+Accra" target="_blank" rel="noreferrer" data-cursor="Map" className="flex items-start gap-3 hover:text-gold">
            <MapPin className="mt-1 h-5 w-5 text-ember" />
            <span>12 Oxford Street, Osu<br />Accra, Ghana</span>
          </a>
          <a href="tel:+233302700000" className="flex items-center gap-3 hover:text-gold"><Phone className="h-5 w-5 text-ember" /> 030 270 0000</a>
          <span className="flex items-center gap-3"><AtSign className="h-5 w-5 text-ember" /> @asanka.osu</span>
        </div>
        <ul className="space-y-2 text-sm">
          {order.map((d) => {
            const h = hours[d];
            return (
              <li key={d} className={`flex justify-between border-b border-cream/10 pb-2 ${d === today ? "font-bold text-gold" : "text-cream/70"}`}>
                <span>{dayNames[d]}{d === today ? " · today" : ""}</span>
                <span>{h ? `${fmt(h[0])} – ${fmt(h[1])}` : "Closed"}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="border-t border-cream/10 px-5 py-6 text-center text-xs text-cream/40">
        A concept site designed and built by <a href="https://hansopoku.com" className="underline hover:text-gold">Hans Opoku</a>. Asanka is a fictional restaurant.
      </p>
    </footer>
  );
}
