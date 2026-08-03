"use client";

import { motion } from "framer-motion";

export default function IntroHeroTransition() {
  return (
    <section aria-hidden="true" className="content-shell -mt-4 pb-8 sm:pb-12">
      <div className="section-card relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(184,137,60,0.35)_50%,transparent_100%)]"
        />
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.45em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.28em" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="relative text-center text-xs uppercase text-[var(--wine)] sm:text-sm"
        >
          The Story Unfolds
        </motion.p>
      </div>
    </section>
  );
}
