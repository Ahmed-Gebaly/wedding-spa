"use client";

import { useEffect, useState } from "react";
import { weddingContent } from "@/content/wedding";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const eventDate = new Date(weddingContent.eventIsoDateTime).getTime();

function getRemainingTime(): TimeLeft | null {
  const now = Date.now();
  const difference = eventDate - now;

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => {
      setTime(getRemainingTime());
    };

    const initialTick = window.setTimeout(tick, 0);

    const timer = window.setInterval(() => {
      setTime(getRemainingTime());
    }, 1000);

    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="content-shell py-10 sm:py-16">
      <div className="section-card p-6 text-center sm:p-10">
        <h3 className="text-4xl sm:text-5xl">Countdown</h3>
        {time === undefined ? (
          <p className="mt-6 text-3xl text-[var(--wine)]">Loading countdown...</p>
        ) : !time ? (
          <p className="mt-6 text-3xl text-[var(--wine)]">Today is the Day</p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <TimeBox label="Days" value={time.days} />
            <TimeBox label="Hours" value={time.hours} />
            <TimeBox label="Minutes" value={time.minutes} />
            <TimeBox label="Seconds" value={time.seconds} />
          </div>
        )}
      </div>
    </section>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[var(--border-soft)] bg-white/70 p-5">
      <p className="text-3xl sm:text-4xl">{String(value).padStart(2, "0")}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--ink-soft)]">{label}</p>
    </div>
  );
}
