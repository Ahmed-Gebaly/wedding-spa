"use client";

import { useEffect, useState } from "react";
import { ArrowDown, CalendarDays } from "lucide-react";
import { weddingContent } from "@/content/wedding";
import LuxurySectionShell from "@/components/ui/luxury-section-shell";

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

  const eventDateObject = new Date(weddingContent.eventIsoDateTime);
  const weekday = eventDateObject.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
  const day = eventDateObject.toLocaleDateString("en-US", { day: "2-digit" });
  const month = eventDateObject.toLocaleDateString("en-US", { month: "long" }).toUpperCase();
  const year = eventDateObject.toLocaleDateString("en-US", { year: "numeric" });

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
    <LuxurySectionShell sectionClassName="countdown-shell" cardClassName="countdown-luxury-card">
        <div className="countdown-ornament-top">❦</div>
        <p className="countdown-eyebrow">Counting down to</p>
        <h3 className="countdown-title">Our Forever</h3>

        <div className="countdown-divider" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <div className="countdown-date-wrap">
          <p className="countdown-weekday">{weekday}</p>
          <p className="countdown-date-line">
            {day} {month} {year}
          </p>
          <p className="countdown-time-line">• {weddingContent.eventTime.toUpperCase()} •</p>
        </div>

        <div className="countdown-divider countdown-divider-secondary" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        {time === undefined ? (
          <p className="countdown-status">Loading countdown...</p>
        ) : !time ? (
          <p className="countdown-status">Today is the Day</p>
        ) : (
          <div className="countdown-grid mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <TimeBox label="Days" value={time.days} />
            <TimeBox label="Hours" value={time.hours} />
            <TimeBox label="Minutes" value={time.minutes} />
            <TimeBox label="Seconds" value={time.seconds} />
          </div>
        )}

        <p className="countdown-love">♥</p>
        <p className="countdown-note">
          We can&apos;t wait
          <br />
          to celebrate with you.
        </p>

        <div className="countdown-divider countdown-divider-tertiary" aria-hidden="true">
          <span />
          <i>❈</i>
          <span />
        </div>

        <div className="countdown-badge" role="status" aria-live="polite">
          <CalendarDays size={20} />
          <span>The celebration is getting closer.</span>
        </div>

        <div className="countdown-arrow" aria-hidden="true">
          <ArrowDown size={38} strokeWidth={1.5} />
        </div>
    </LuxurySectionShell>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="countdown-time-box rounded-2xl border border-[var(--border-soft)] bg-white/70 p-5">
      <span className="countdown-box-ornament countdown-box-ornament-top">✧</span>
      <p className="countdown-time-value">{String(value).padStart(2, "0")}</p>
      <p className="countdown-time-label">{label}</p>
      <span className="countdown-box-ornament countdown-box-ornament-bottom">✧</span>
    </div>
  );
}
