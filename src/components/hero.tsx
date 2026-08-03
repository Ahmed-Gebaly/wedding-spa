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
  const ctaText = "BEGIN OUR STORY";
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

  const formattedDate = weddingContent.eventDisplayDate.replace(/\//g, " \u00b7 ");

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
      </motion.div>

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pt-7 pb-6 sm:min-h-screen sm:px-10 sm:pt-8 sm:pb-8">
        <motion.div
          className="mt-auto mb-[6.2rem] text-center text-white sm:mb-32"
          variants={heroNamesVariants}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
        >
          <p className="aref-ruqaa-bold text-[5.2rem] leading-[0.82] [text-shadow:0_3px_18px_rgba(0,0,0,0.28)] sm:text-[6.5rem]" dir="rtl">
            {firstName}
          </p>
          <p className="my-1 text-[1.1rem] font-medium text-[rgb(226,196,150)]">&amp;</p>
          <p className="aref-ruqaa-bold text-[5.2rem] leading-[0.82] [text-shadow:0_3px_18px_rgba(0,0,0,0.28)] sm:text-[6.5rem]" dir="rtl">
            {secondName}
          </p>
          <motion.p
            className="mt-8 text-[0.68rem] tracking-[0.34em] text-[rgb(230,202,160)]"
            variants={heroDateVariants}
            initial={reducedMotion ? false : "initial"}
            animate={reducedMotion ? undefined : "animate"}
          >
            {formattedDate}
          </motion.p>
        </motion.div>

        <motion.button
          type="button"
          onClick={triggerBeginStory}
          aria-label="Begin Our Story"
          className="absolute bottom-6 left-1/2 min-h-11 min-w-[15rem] -translate-x-1/2 rounded-[999px] border border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.08)] px-[42px] py-[18px] text-center text-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-[20px] transition-colors hover:bg-[rgba(255,255,255,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          variants={heroBeginVariants}
          initial={reducedMotion ? false : "initial"}
          animate={reducedMotion ? undefined : "animate"}
        >
          <p className="text-[0.83rem] tracking-[0.28em]">{ctaText}</p>
          <motion.span
            className="mx-auto mt-1.5 block text-base"
            variants={reducedMotion ? undefined : beginArrowVariants}
            animate={reducedMotion ? undefined : "animate"}
          >
            ↓
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
