"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,#fde4bd_0%,transparent_32%),radial-gradient(circle_at_80%_80%,#e9c8a3_0%,transparent_28%)]" />
      <div className="content-shell fade-in section-card px-6 py-16 sm:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="text-lg italic text-[var(--ink-soft)] sm:text-xl"
        >
          Every love story is beautiful,
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 1 }}
          className="mt-4 text-5xl leading-tight sm:text-6xl"
        >
          but ours is my favorite.
        </motion.h1>
      </div>
    </section>
  );
}
