"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import LuxurySectionShell from "@/components/ui/luxury-section-shell";
import TimelineItem, { type TimelineEvent } from "@/components/timeline-item";
import { assetPath } from "@/lib/asset-path";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

const timelineEvents: TimelineEvent[] = [
  {
    id: "ready",
    time: "10:00 AM",
    title: "Getting Ready",
    venue: ["Grand Hotel", "Port Said"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=31.270954%2C32.300861",
    iconPath: "/assets/icons/clock.svg",
  },
  {
    id: "photo",
    time: "4:00 PM",
    title: "Photo Session",
    venue: ["Helnan Port Said Hotel Garden"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=31.270692%2C32.315481",
    iconPath: "/assets/icons/camera.svg",
  },
  {
    id: "celebration",
    time: "8:00 PM",
    title: "Wedding Celebration",
    venue: ["Rozy Hall", "Port Said"],
    mapsLink: "https://www.google.com/maps/search/?api=1&query=31.270551%2C32.304659",
    iconPath: "/assets/icons/location-pin.svg",
  },
];

export default function DayTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  const progressDuration = useMemo(() => 1.2, []);

  return (
    <LuxurySectionShell sectionClassName="day-timeline-shell" cardClassName="day-timeline-card">
      <div ref={sectionRef} className="day-timeline-content">
        <motion.div
          className="day-timeline-ornament"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
        >
          <Image src={assetPath("/assets/sparkle.svg")} alt="" width={80} height={30} />
        </motion.div>

        <motion.h3
          className="day-timeline-title"
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 0.05 }}
        >
          THE
          <br />
          WEDDING
          <br />
          DAY
        </motion.h3>

        <motion.p
          className="day-timeline-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 0.12 }}
        >
          Every beautiful moment has its time.
        </motion.p>

        <motion.div
          className="day-timeline-divider"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 0.18 }}
        >
          <Image src={assetPath("/assets/divider-gold.svg")} alt="" width={220} height={24} />
        </motion.div>

        <div className="day-timeline-track-wrap" aria-hidden="true">
          <div className="day-timeline-track" />
          <motion.div
            className="day-timeline-progress"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: progressDuration, ease: EASE_LUXURY, delay: 0.24 }}
          />
        </div>

        <div className="day-timeline-items">
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              index={index}
              progressDuration={progressDuration}
              timelineVisible={isInView}
            />
          ))}
        </div>

        <motion.div
          className="day-timeline-divider day-timeline-divider-bottom"
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 0.8 }}
        >
          <Image src={assetPath("/assets/divider-gold.svg")} alt="" width={220} height={24} />
        </motion.div>

        <motion.p
          className="day-timeline-closing"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 0.9 }}
        >
          We look forward to celebrating this unforgettable day with you.
        </motion.p>

        <motion.div
          className="day-timeline-heart"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 1.0 }}
        >
          <Image src={assetPath("/assets/icons/heart.svg")} alt="" width={30} height={30} />
        </motion.div>

        <motion.div
          className="day-timeline-arrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE_LUXURY, delay: 1.05 }}
          aria-hidden="true"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={28} strokeWidth={1.6} />
          </motion.span>
        </motion.div>
      </div>
    </LuxurySectionShell>
  );
}
