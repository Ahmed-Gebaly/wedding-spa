"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Countdown from "@/components/countdown";
import CinematicIntro from "@/components/cinematic-intro";
import DayTimeline from "@/components/day-timeline";
import Details from "@/components/details";
import GlobalFallingPetals from "@/components/global-falling-petals";
import Hero from "@/components/hero";
import Location from "@/components/location";
import Memories from "@/components/memories";
import MusicPlayer from "@/components/music-player";
import ThankYou from "@/components/thank-you";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DURATION_LUXURY = 0.7;

export default function InvitationExperience() {
  const [stage, setStage] = useState<"hero" | "invitation">("hero");

  const handleOpenInvitation = () => {
    const audio = document.getElementById("wedding-audio") as HTMLAudioElement | null;

    if (audio) {
      // Opening the invitation is a direct user interaction, so we can
      // safely start audio and fade up from silence.
      audio.muted = false;
      audio.volume = 0;

      const fadeMs = 2500;
      const start = performance.now();

      const fadeIn = (time: number) => {
        const progress = Math.min((time - start) / fadeMs, 1);
        audio.volume = Math.max(0, Math.min(progress, 1));

        if (progress < 1) {
          requestAnimationFrame(fadeIn);
        }
      };

      if (audio.paused) {
        void audio.play().then(() => {
          requestAnimationFrame(fadeIn);
        }).catch(() => {
          // Some browsers still block autoplay; user can use the music button.
        });
      } else {
        requestAnimationFrame(fadeIn);
      }
    }

    setStage("invitation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <GlobalFallingPetals />
      <MusicPlayer visible />
      <AnimatePresence mode="wait">
        {stage === "hero" ? (
          <motion.div
            key="hero-entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION_LUXURY, ease: EASE_LUXURY }}
          >
            <Hero onBeginStory={handleOpenInvitation} />
          </motion.div>
        ) : (
          <motion.main
            key="invitation-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION_LUXURY, ease: EASE_LUXURY }}
            className="overflow-x-hidden"
          >
            <CinematicIntro />
            <Countdown />
            <Details />
            <Location />
            <DayTimeline />
            <Memories />
            <ThankYou />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
