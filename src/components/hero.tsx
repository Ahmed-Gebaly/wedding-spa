"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { HERO_DUST_PARTICLES, HERO_IMAGE_SRC } from "@/components/hero.constants";
import { beginArrowVariants, heroBeginVariants, heroDateVariants, heroImageVariants, heroNamesVariants } from "@/components/hero.motion";
import { weddingContent } from "@/content/wedding";

type HeroProps = {
  onBeginStory: () => void;
};

export default function Hero({ onBeginStory }: HeroProps) {
  const [firstName, secondName] = weddingContent.coupleNames
    .split(/[,&]/)
    .map((name) => name.trim())
    .filter(Boolean);
  const reducedMotion = useReducedMotion();
  const touchStartYRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const triggerBeginStory = () => {
    if (hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;
    onBeginStory();
  };

  const handleWheel: React.WheelEventHandler<HTMLElement> = (event) => {
    if (event.deltaY > 24) {
      triggerBeginStory();
    }
  };

  const handleTouchStart: React.TouchEventHandler<HTMLElement> = (event) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLElement> = (event) => {
    const startY = touchStartYRef.current;
    const endY = event.changedTouches[0]?.clientY;

    if (startY == null || endY == null) {
      return;
    }

    const swipeDelta = startY - endY;
    if (swipeDelta > 46) {
      triggerBeginStory();
    }
  };

  const weekdayLabel = "FRIDAY";
  const fullDateLabel = "07 AUGUST 2026";

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--background)] sm:min-h-screen"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[#f8f5f0]" />
        <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply [background-image:radial-gradient(#5b4b3f_0.8px,transparent_0.8px)] [background-size:3px_3px]" />
      </motion.div>

      {!reducedMotion ? (
        <motion.div className="pointer-events-none absolute inset-0">
          {HERO_DUST_PARTICLES.map((particle, index) => (
            <motion.span
              key={`${particle.x}-${particle.y}-${index}`}
              className="absolute rounded-full bg-[#f0e4cf]"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: 0.1,
                willChange: "transform, opacity",
              }}
              animate={{ y: [0, -18, 0], x: [0, 6, 0], opacity: [0.06, 0.12, 0.06] }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      ) : null}

      <motion.div
        className="absolute inset-0 z-[1]"
        variants={heroImageVariants}
        initial={reducedMotion ? false : "initial"}
        animate={reducedMotion ? undefined : "animate"}
      >
        <Image
          src={HERO_IMAGE_SRC}
          alt={`${weddingContent.coupleNames} portrait`}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[52%_36%] sm:object-[50%_40%]"
          quality={88}
          style={{ filter: "contrast(1.1) brightness(0.94) saturate(0.96)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_46%),linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.22)_58%,rgba(0,0,0,0.52)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_42%,rgba(0,0,0,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.12)_18%,rgba(0,0,0,0)_42%)]" />
      </motion.div>

      <div className="relative z-10 min-h-[100svh] px-6 pt-7 sm:flex sm:min-h-screen sm:flex-col sm:px-10 sm:pt-8 sm:pb-8">
        <div className="absolute inset-x-0 bottom-[max(1.55rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-2 px-6 text-center sm:bottom-10">
          <motion.div
            className="-translate-y-2 sm:-translate-y-1"
            variants={heroNamesVariants}
            initial={reducedMotion ? false : "initial"}
            animate={reducedMotion ? undefined : "animate"}
          >
            <p
              className="mx-auto max-w-[320px] text-center font-['Cormorant_Garamond'] text-[1.28rem] italic font-normal leading-[1.9] tracking-[0.01em] text-[#4A4036]"
              dir="rtl"
            >
              {firstName}
            </p>
            <p
              className="mx-auto max-w-[320px] text-center font-['Cormorant_Garamond'] text-[1.28rem] italic font-normal leading-[1.9] tracking-[0.01em] text-[#4A4036]"
              dir="rtl"
            >
              {secondName}
            </p>
            <motion.p
              className="mt-8 font-['Cormorant_Garamond'] text-[0.74rem] tracking-[0.43em] text-[#E9D9B6]"
              variants={heroDateVariants}
              initial={reducedMotion ? false : "initial"}
              animate={reducedMotion ? undefined : "animate"}
            >
              {weekdayLabel}
            </motion.p>
            <motion.p
              className="mt-1 font-['Cormorant_Garamond'] text-[1.24rem] tracking-[0.2em] text-[#E9D9B6]"
              variants={heroDateVariants}
              initial={reducedMotion ? false : "initial"}
              animate={reducedMotion ? undefined : "animate"}
            >
              {fullDateLabel}
            </motion.p>
          </motion.div>

          <motion.button
            type="button"
            onClick={triggerBeginStory}
            aria-label="Begin Our Story"
            className="bg-transparent p-0 text-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            variants={heroBeginVariants}
            initial={reducedMotion ? false : "initial"}
            animate={reducedMotion ? undefined : "animate"}
          >
            <span className="block text-[0.74rem] font-medium tracking-[0.35em] text-white/80">BEGIN OUR STORY</span>
            <motion.span
              className="mx-auto mt-2 block text-[0.98rem] font-extralight text-white/70"
              variants={reducedMotion ? undefined : beginArrowVariants}
              animate={reducedMotion ? undefined : "animate"}
            >
              ↓
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
