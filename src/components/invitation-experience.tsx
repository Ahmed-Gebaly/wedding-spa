"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "@/components/countdown";
import Details from "@/components/details";
import Gallery from "@/components/gallery";
import Hero from "@/components/hero";
import Invitation from "@/components/invitation";
import Location from "@/components/location";
import Memories from "@/components/memories";
import Story from "@/components/story";
import ThankYou from "@/components/thank-you";
import { HERO_ANIMATION } from "@/components/hero.constants";

export default function InvitationExperience() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenInvitation = () => {
    const audio = document.getElementById("wedding-audio") as HTMLAudioElement | null;

    if (audio) {
      audio.muted = false;
      audio.volume = 0;
      void audio.play().catch(() => {
        // User may not have provided audio file yet.
      });

      const start = performance.now();
      const fadeMs = 2500;

      const fadeIn = (time: number) => {
        const progress = Math.min((time - start) / fadeMs, 1);
        audio.volume = Math.max(0, Math.min(progress, 1));

        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        }
      };

      requestAnimationFrame(fadeIn);
    }

    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToLanding = () => {
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <AnimatePresence mode="wait">
      {!isOpened ? (
        <motion.div
          key="hero-entry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: HERO_ANIMATION.overlayFadeDuration, ease: "easeInOut" }}
        >
          <Hero onBeginStory={handleOpenInvitation} />
        </motion.div>
      ) : (
        <motion.main
          key="invitation-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-x-hidden"
        >
          <button
            type="button"
            onClick={handleBackToLanding}
            className="fixed right-6 top-6 z-50 rounded-full border border-[var(--gold)] bg-white/90 px-5 py-2 text-xs uppercase tracking-[0.14em] text-[var(--wine)] shadow-md backdrop-blur transition hover:bg-white"
          >
            Back to Landing
          </button>
          <Story />
          <Gallery />
          <Invitation />
          <Details />
          <Countdown />
          <Location />
          <Memories />
          <ThankYou />
        </motion.main>
      )}
    </AnimatePresence>
  );
}
