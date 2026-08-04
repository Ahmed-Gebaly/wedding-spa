import type { Variants } from "framer-motion";
import { HERO_ANIMATION } from "@/components/hero.constants";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DURATION_LUXURY = 0.7;

export const heroImageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: HERO_ANIMATION.imageScaleFrom,
  },
  animate: {
    opacity: 1,
    scale: HERO_ANIMATION.imageScaleTo,
    transition: {
      opacity: { duration: DURATION_LUXURY, ease: EASE_LUXURY },
      scale: { duration: DURATION_LUXURY, ease: EASE_LUXURY },
    },
  },
};

export const heroNamesVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_LUXURY, ease: EASE_LUXURY, delay: 0.12 },
  },
};

export const heroDateVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_LUXURY, ease: EASE_LUXURY, delay: 0.24 },
  },
};

export const heroBeginVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_LUXURY, ease: EASE_LUXURY, delay: 0.36 },
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
