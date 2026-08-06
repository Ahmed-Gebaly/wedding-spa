"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import DirectionButton from "@/components/direction-button";
import { assetPath } from "@/lib/asset-path";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type TimelineEvent = {
  id: string;
  time: string;
  title: string;
  venue: string[];
  mapsLink: string;
  iconPath: string;
};

type TimelineItemProps = {
  event: TimelineEvent;
  index: number;
  progressDuration: number;
  timelineVisible: boolean;
};

export default function TimelineItem({ event, index, progressDuration, timelineVisible }: TimelineItemProps) {
  const staggerDelay = index * 0.15;
  const baseDelay = 0.24;

  return (
    <motion.article
      className="timeline-item"
      initial={{ opacity: 0, y: 18 }}
      animate={
        timelineVisible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 18 }
      }
      transition={{
        duration: 0.7,
        ease: EASE_LUXURY,
        delay: baseDelay + progressDuration * 0.5 + staggerDelay,
      }}
    >
      <motion.div
        className="timeline-item-dot"
        initial={{ scale: 0.85, opacity: 0.6 }}
        animate={
          timelineVisible
            ? { scale: 1, opacity: 1, boxShadow: "0 0 0 10px rgba(199,165,106,0)" }
            : { scale: 0.85, opacity: 0.6 }
        }
        transition={{
          duration: 0.5,
          ease: EASE_LUXURY,
          delay: baseDelay + progressDuration * 0.35 + staggerDelay,
        }}
      >
        <Image src={assetPath("/assets/icons/timeline-dot.svg")} alt="" width={18} height={18} />
      </motion.div>

      <div className="timeline-item-grid">
        <div className="timeline-icon-badge" aria-hidden="true">
          <Image src={assetPath(event.iconPath)} alt="" width={28} height={28} className="timeline-event-icon" />
        </div>

        <div className="timeline-copy">
          <p className="timeline-time">{event.time}</p>
          <h4 className="timeline-event-title">{event.title}</h4>
          <p className="timeline-venue">
            {event.venue.join("\n")}
          </p>
          <DirectionButton href={event.mapsLink} />
        </div>
      </div>
    </motion.article>
  );
}
