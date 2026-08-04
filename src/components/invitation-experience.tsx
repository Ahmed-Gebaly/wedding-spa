"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "@/components/countdown";
import CinematicIntro from "@/components/cinematic-intro";
import Details from "@/components/details";
import Hero from "@/components/hero";
import Location from "@/components/location";
import Memories from "@/components/memories";
import MusicPlayer from "@/components/music-player";
import ThankYou from "@/components/thank-you";

export default function InvitationExperience() {
  const [stage, setStage] = useState<"hero" | "invitation">("hero");
  const [isCinematicVisible, setIsCinematicVisible] = useState(false);

  const handleOpenInvitation = () => {
    const audio = document.getElementById("wedding-audio") as HTMLAudioElement | null;

    if (audio) {
      const shouldStayMuted = audio.muted;

      if (audio.paused) {
        audio.volume = shouldStayMuted ? 1 : 0;
        void audio.play().catch(() => {
          // User may not have provided audio file yet.
        });
      }

      if (!shouldStayMuted) {
        const start = performance.now();
        const startVolume = Math.max(0, Math.min(audio.volume, 1));
        const fadeMs = 2500;

        const fadeIn = (time: number) => {
          const progress = Math.min((time - start) / fadeMs, 1);
          const nextVolume = startVolume + (1 - startVolume) * progress;
          audio.volume = Math.max(0, Math.min(nextVolume, 1));

          if (progress < 1) {
            requestAnimationFrame(fadeIn);
          }
        };

        requestAnimationFrame(fadeIn);
      }
    }

    setStage("invitation");
    setIsCinematicVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MusicPlayer visible={stage === "hero" || isCinematicVisible} />
      <AnimatePresence mode="wait">
        {stage === "hero" ? (
          <motion.div
            key="hero-entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
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
            <CinematicIntro onVisibilityChange={setIsCinematicVisible} />
            <Countdown />
            <Details />
            <Location />
            <Memories />
            <ThankYou />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
