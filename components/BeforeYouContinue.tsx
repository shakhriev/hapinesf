"use client";

import { motion } from "framer-motion";

export default function BeforeYouContinue({
  onContinue,
}: {
  onContinue: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="max-w-xl text-center"
      >
        <h2 className="text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
          Before you continue...
        </h2>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-neutral-600">
<p>
  You don&apos;t have to read this, and you don&apos;t have to respond afterwards.
</p>
          <p>
            I made this website only because there were a few things I
            wanted to say one last time. Nothing more is expected from you.
          </p>
          <p>
            If today isn&apos;t the right day, you can simply close this
            page. It will still be here whenever, or if ever, you feel
            ready.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          onClick={onContinue}
          className="mt-10 rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-neutral-700"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
