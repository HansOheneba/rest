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
    return { open: true, text: `The grill is lit until ${close}.` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const hrs = hours[d];
    if (hrs && (i > 0 || h < hrs[0])) {
      const when = i === 0 ? "today" : i === 1 ? "tomorrow" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d];
      const at = `${hrs[0] > 12 ? hrs[0] - 12 : hrs[0]}${hrs[0] >= 12 ? "pm" : "am"}`;
      return { open: false, text: when === "today" ? `Coals go on at ${at}.` : `Closed now. Coals go on ${when} at ${at}.` };
    }
  }
  return { open: false, text: "Closed now." };
}

export default function OpenStatus({ className = "" }: { className?: string }) {
  const mounted = useMounted();
  if (!mounted) return <span className={`block h-6 ${className}`} />;
  const s = getStatus();
  return (
    <span className={`block text-base font-medium ${s.open ? "text-gold" : "text-cream/70"} ${className}`}>
      {s.text}
    </span>
  );
}
