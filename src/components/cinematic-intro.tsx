"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";

type CinematicIntroProps = {
  onComplete?: () => void;
  onVisibilityChange?: (isVisible: boolean) => void;
};

const AUTO_COMPLETE_MS = 5700;

type ParticleKind = "circle" | "spark" | "diamond";

type DustParticle = {
  left: number;
  topStart: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  color: "#FFF8EE" | "#F6E6C3" | "#D6BE94";
  kind: ParticleKind;
};

const DUST_COLORS = ["#FFF8EE", "#F6E6C3", "#D6BE94"] as const;

const DUST_PARTICLES: DustParticle[] = [
  { left: 4, topStart: -8, size: 2, opacity: 0.12, duration: 14, delay: 0.2, drift: -7, color: DUST_COLORS[0], kind: "circle" },
  { left: 8, topStart: -14, size: 4, opacity: 0.22, duration: 21, delay: 1.4, drift: 8, color: DUST_COLORS[1], kind: "circle" },
  { left: 12, topStart: -10, size: 3, opacity: 0.16, duration: 16, delay: 0.6, drift: -6, color: DUST_COLORS[2], kind: "circle" },
  { left: 15, topStart: -12, size: 5, opacity: 0.24, duration: 24, delay: 2.1, drift: 7, color: DUST_COLORS[0], kind: "circle" },
  { left: 88, topStart: -9, size: 3, opacity: 0.14, duration: 18, delay: 0.9, drift: -8, color: DUST_COLORS[1], kind: "circle" },
  { left: 91, topStart: -13, size: 2, opacity: 0.1, duration: 13, delay: 0.4, drift: 6, color: DUST_COLORS[2], kind: "circle" },
  { left: 94, topStart: -16, size: 4, opacity: 0.2, duration: 22, delay: 1.7, drift: -7, color: DUST_COLORS[0], kind: "circle" },
  { left: 97, topStart: -11, size: 3, opacity: 0.18, duration: 20, delay: 1.1, drift: 7, color: DUST_COLORS[1], kind: "spark" },
  { left: 6, topStart: -15, size: 2, opacity: 0.13, duration: 15, delay: 2.3, drift: -5, color: DUST_COLORS[2], kind: "spark" },
  { left: 10, topStart: -18, size: 3, opacity: 0.19, duration: 23, delay: 0.8, drift: 6, color: DUST_COLORS[0], kind: "diamond" },
  { left: 93, topStart: -17, size: 3, opacity: 0.17, duration: 19, delay: 1.9, drift: -6, color: DUST_COLORS[1], kind: "diamond" },
];

const TWINKLES = [
  { left: 14, top: 16, duration: 4.2, delay: 0.2, size: 9 },
  { left: 88, top: 22, duration: 5.6, delay: 1.1, size: 8 },
  { left: 8, top: 56, duration: 3.8, delay: 2.2, size: 8 },
  { left: 92, top: 66, duration: 4.9, delay: 0.9, size: 9 },
  { left: 12, top: 76, duration: 5.2, delay: 1.8, size: 8 },
] as const;

const BOKEH = [
  { left: 8, top: 26, size: 26, duration: 26, delay: 0.8 },
  { left: 92, top: 38, size: 36, duration: 30, delay: 1.3 },
  { left: 10, top: 72, size: 22, duration: 24, delay: 2.1 },
] as const;

const verseLines = [
  "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ",
  "مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا",
  "وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً",
  "إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ",
] as const;

const translationLines = [
  "And among His signs is that He created for you mates",
  "from among yourselves that you may find tranquility",
  "in them; and He placed between you affection and mercy.",
  "Indeed in that are signs for a people who reflect.",
] as const;

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  inView: { opacity: 1, y: 0 },
};

export default function CinematicIntro({ onComplete, onVisibilityChange }: CinematicIntroProps) {
  const reducedMotion = useReducedMotion();
  const didCompleteRef = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const particleStyles = useMemo(
    () =>
      DUST_PARTICLES.map((particle) => ({
        left: `${particle.left}%`,
        top: `${particle.topStart}%`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.opacity,
        color: particle.color,
        filter: particle.size >= 4 ? "blur(0.5px)" : "none",
        "--dust-drift": `${particle.drift}px`,
        animation: `cinematic-dust-fall ${particle.duration}s linear ${particle.delay}s infinite`,
      })),
    []
  );

  const complete = useCallback(() => {
    if (didCompleteRef.current) {
      return;
    }

    didCompleteRef.current = true;
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!onComplete) {
      return;
    }

    if (reducedMotion) {
      const timer = window.setTimeout(complete, 1800);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(complete, AUTO_COMPLETE_MS);
    return () => window.clearTimeout(timer);
  }, [complete, onComplete, reducedMotion]);

  useEffect(() => {
    if (!onVisibilityChange || !sectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        onVisibilityChange(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onVisibilityChange]);

  const handleWheel: React.WheelEventHandler<HTMLElement> = (event) => {
    if (Math.abs(event.deltaY) > 8) {
      complete();
    }
  };

  return (
    <section className="content-shell cinematic-shell py-10 sm:py-16">
      <div
        ref={sectionRef}
        className="cinematic-card cinematic-layout cinematic-section text-center text-[#2B2B2B]"
        onClick={onComplete ? complete : undefined}
        onTouchStart={onComplete ? complete : undefined}
        onWheel={handleWheel}
      >
        <div className="background-layer" aria-hidden="true">
          <Image
            src={assetPath("/cinematic.png")}
            alt=""
            fill
            sizes="100vw"
            className="background-image"
            priority={false}
          />
          <div className="background-vignette" />
          <div className="paper-glow" />
          <div className="paper-grain" />
          <div className="bottom-left-corner-soften" />
        </div>

        <div className="particles-layer" aria-hidden="true">
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ opacity: { duration: reducedMotion ? 0.2 : 0.7, ease: "easeOut" } }}
          >
          {!reducedMotion
            ? DUST_PARTICLES.map((particle, index) => (
                <span
                  key={`dust-${particle.left}-${index}`}
                  className="pointer-events-none absolute will-change-transform"
                  style={particleStyles[index] as React.CSSProperties}
                >
                  {particle.kind === "circle" ? (
                    <span className="block h-full w-full rounded-full" style={{ backgroundColor: particle.color }} />
                  ) : particle.kind === "spark" ? (
                    <span
                      className="block h-full w-full"
                      style={{
                        backgroundColor: particle.color,
                        clipPath: "polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)",
                      }}
                    />
                  ) : (
                    <span className="block h-full w-full rotate-45" style={{ backgroundColor: particle.color }} />
                  )}
                </span>
              ))
            : null}

          {!reducedMotion
            ? TWINKLES.map((twinkle) => (
                <span
                  key={`twinkle-${twinkle.left}-${twinkle.top}`}
                  className="pointer-events-none absolute text-[#F6E6C3] will-change-[opacity]"
                  style={{
                    left: `${twinkle.left}%`,
                    top: `${twinkle.top}%`,
                    fontSize: `${twinkle.size}px`,
                    opacity: 0.2,
                    animation: `cinematic-twinkle ${twinkle.duration}s ease-in-out ${twinkle.delay}s infinite`,
                  }}
                >
                  ✦
                </span>
              ))
            : null}

          {!reducedMotion
            ? BOKEH.map((item) => (
                <span
                  key={`bokeh-${item.left}-${item.top}`}
                  className="pointer-events-none absolute rounded-full bg-[#FFF8EE] will-change-transform"
                  style={{
                    left: `${item.left}%`,
                    top: `${item.top}%`,
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    opacity: 0.04,
                    filter: "blur(8px)",
                    animation: `cinematic-bokeh-drift ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
                  }}
                />
              ))
            : null}
          </motion.div>
        </div>

        <div className="content-layer">
          <div className="cinematic-content relative w-full">
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="inView"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
              className="cinematic-bismillah mx-auto"
            >
              <Image
                src={assetPath("/assets/Bismillah.svg")}
                alt="Bismillah calligraphy"
                width={180}
                height={70}
                className="h-auto w-full"
                priority={false}
              />
            </motion.div>

        <blockquote className="cinematic-verse-block mx-auto max-w-[860px] text-[#2B2B2B]" dir="rtl">
          {verseLines.map((line, index) => (
            <motion.p
              key={line}
              variants={fadeUp}
              initial="initial"
              whileInView="inView"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0.05 * (index + 1) : 1.2 + index * 0.35, ease: "easeOut" }}
              className="cinematic-verse-line quran-text"
            >
              {line}
            </motion.p>
          ))}
          <motion.cite
            variants={fadeUp}
            initial="initial"
            whileInView="inView"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0.15 : 3.45, ease: "easeOut" }}
            className="cinematic-verse-reference quran-text block not-italic text-[#A88F62]"
          >
            ﴿ الروم : ٢١ ﴾
          </motion.cite>
        </blockquote>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0.2 : 3.85, ease: "easeOut" }}
          className="cinematic-divider cinematic-divider-middle mx-auto"
        >
          <Image src={assetPath("/assets/divider-gold.svg")} alt="Gold divider" width={240} height={24} className="cinematic-divider-image h-auto w-full" />
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0.25 : 4.25, ease: "easeOut" }}
          className="cinematic-translation mx-auto font-['Cormorant_Garamond','Bodoni_Moda','Didot','Playfair_Display',serif]"
        >
          {translationLines.map((line) => (
            <span key={line} className="block cinematic-translation-line">
              {line}
            </span>
          ))}
        </motion.blockquote>

        <motion.p
          variants={fadeUp}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0.3 : 4.7, ease: "easeOut" }}
          className="cinematic-english-reference font-['Cormorant_Garamond','Bodoni_Moda','Didot','Playfair_Display',serif]"
        >
          <span className="cinematic-ref-bracket">﴾ </span>
          <span className="cinematic-ref-text">Ar-Rūm 30:21</span>
          <span className="cinematic-ref-bracket">﴿</span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.8, delay: reducedMotion ? 0.35 : 5.1, ease: "easeOut" }}
          className="cinematic-divider cinematic-divider-bottom mx-auto"
        >
          <Image src={assetPath("/assets/divider-gold.svg")} alt="Gold divider" width={220} height={24} className="cinematic-divider-image h-auto w-full" />
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
