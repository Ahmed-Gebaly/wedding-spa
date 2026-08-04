import type { Variants } from "framer-motion";
import { HERO_ANIMATION } from "@/components/hero.constants";

export const heroImageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: HERO_ANIMATION.imageScaleFrom,
  },
  animate: {
    opacity: 1,
    scale: HERO_ANIMATION.imageScaleTo,
    transition: {
      opacity: { duration: HERO_ANIMATION.imageFadeDuration, ease: "easeOut" },
      scale: { duration: HERO_ANIMATION.imageScaleDuration, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

export const heroNamesVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: HERO_ANIMATION.namesDuration, ease: "easeOut", delay: 0.3 },
  },
};

export const heroDateVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.15, ease: "easeOut", delay: 0.6 },
  },
};

export const heroBeginVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: "easeOut", delay: 0.9 },
  },
};

export const beginArrowVariants: Variants = {
  animate: {
    y: [0, HERO_ANIMATION.beginArrowTravel, 0],
    transition: {
      duration: HERO_ANIMATION.beginArrowDuration,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};
