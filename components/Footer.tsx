"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="border-t border-neutral-100 bg-white px-6 py-16 text-center"
    >
      <p className="text-sm text-neutral-400">With gratitude and respect,</p>
      <p className="text-sm text-neutral-400">Quvonchbek</p>

      <p className="mx-auto mt-8 max-w-md text-xs italic leading-relaxed text-neutral-300">
        &ldquo;I don&apos;t like fame. One day the lights will go out, and
        when they do, I hope it will be difficult to find me.&rdquo;
        <br />
        — Victor Valdés
      </p>
    </motion.footer>
  );
}
