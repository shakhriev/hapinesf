"use client";

import { motion } from "framer-motion";

export default function BlurredBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-neutral-200/60 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-neutral-300/50 blur-3xl"
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-neutral-100 blur-3xl"
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
