"use client";

import { useEffect, useMemo, useState } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useHeroParallax(maxOffset: number, enabled: boolean) {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springX = useSpring(pointerX, { stiffness: 65, damping: 16, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 65, damping: 16, mass: 0.8 });

  const x = useTransform(springX, [0, 1], [-maxOffset, maxOffset]);
  const y = useTransform(springY, [0, 1], [-maxOffset, maxOffset]);

  const style = useMemo(() => ({ x, y }), [x, y]);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!enabled) {
      return;
    }

    const target = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - target.left) / target.width;
    const relativeY = (event.clientY - target.top) / target.height;
    pointerX.set(Math.max(0, Math.min(1, relativeX)));
    pointerY.set(Math.max(0, Math.min(1, relativeY)));
  };

  const onPointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return { style, onPointerMove, onPointerLeave };
}

export function useDesktopParallaxEnabled(minWidth: number) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnabled(media.matches && !reduced.matches);
    };

    update();

    media.addEventListener("change", update);
    reduced.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, [minWidth]);

  return enabled;
}
