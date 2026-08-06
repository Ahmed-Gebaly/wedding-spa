"use client";

import { memo } from "react";

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
  rotate: number;
};

const PETALS: Petal[] = [
  { left: 6, delay: 0.2, duration: 22, size: 11, drift: 34, opacity: 0.22, rotate: 16 },
  { left: 14, delay: 1.4, duration: 20, size: 12, drift: 30, opacity: 0.2, rotate: -20 },
  { left: 23, delay: 0.8, duration: 24, size: 10, drift: 36, opacity: 0.18, rotate: 22 },
  { left: 33, delay: 2.2, duration: 21, size: 13, drift: 28, opacity: 0.2, rotate: -14 },
  { left: 44, delay: 1.1, duration: 25, size: 12, drift: 38, opacity: 0.18, rotate: 19 },
  { left: 53, delay: 2.8, duration: 23, size: 9, drift: 32, opacity: 0.2, rotate: -24 },
  { left: 63, delay: 1.9, duration: 20, size: 11, drift: 34, opacity: 0.19, rotate: 17 },
  { left: 73, delay: 0.5, duration: 22, size: 13, drift: 29, opacity: 0.22, rotate: -18 },
  { left: 82, delay: 3.1, duration: 26, size: 10, drift: 35, opacity: 0.17, rotate: 20 },
  { left: 91, delay: 1.6, duration: 24, size: 12, drift: 33, opacity: 0.19, rotate: -15 },
];

function GlobalFallingPetals() {
  return (
    <div className="global-petals-layer" aria-hidden="true">
      {PETALS.map((petal, index) => (
        <span
          key={`petal-${index}`}
          className="global-petal"
          style={
            {
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 0.72}px`,
              opacity: petal.opacity,
              transform: `rotate(${petal.rotate}deg)`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              "--petal-drift": `${petal.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default memo(GlobalFallingPetals);
