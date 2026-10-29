"use client";

import { hours } from "@/lib/data";
import { useMounted } from "@/lib/table";

// Accra runs on GMT all year, so UTC is local time.
export function getStatus(now = new Date()) {
  const day = now.getUTCDay();
  const h = now.getUTCHours() + now.getUTCMinutes() / 60;
  const today = hours[day];
  if (today && h >= today[0] && h < today[1]) {
    const close = today[1] === 24 ? "midnight" : `${today[1] > 12 ? today[1] - 12 : today[1]}pm`;
    return { open: true, text: `Open now · until ${close}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const hrs = hours[d];
    if (hrs && (i > 0 || h < hrs[0])) {
      const when = i === 0 ? "today" : i === 1 ? "tomorrow" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d];
      return { open: false, text: `Closed · opens ${when} at ${hrs[0] > 12 ? hrs[0] - 12 : hrs[0]}${hrs[0] >= 12 ? "pm" : "am"}` };
    }
  }
  return { open: false, text: "Closed" };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const mounted = useMounted();
  if (!mounted) return <span className={`inline-block h-8 w-44 rounded-full bg-cream/10 ${className}`} />;
  const s = getStatus();
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-cream/20 bg-night/40 px-4 py-1.5 text-xs backdrop-blur ${className}`}>
      <span className="relative flex h-2 w-2">
        {s.open ? <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /> : null}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${s.open ? "bg-green-400" : "bg-ember"}`} />
      </span>
      {s.text}
    </span>
  );
}
