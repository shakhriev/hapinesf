"use client";

import { forwardRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ContactSection = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
    } catch {
      // She is never shown an error — only ever "Thank you."
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  }

  return (
    <section ref={ref} className="bg-neutral-50 px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mx-auto max-w-lg text-center"
      >
        <h2 className="text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
          If you ever wish to say something...
        </h2>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-neutral-600">
          <p>I don&apos;t expect a response.</p>
          <p>
            If, for any reason, you ever want to say something, you&apos;re
            always welcome to leave me a message below or write to me
            directly.
          </p>
        </div>

        <p className="mt-6 text-sm italic text-neutral-400">
          No pressure. No expectations. No need to reopen old memories. Only
          if it ever feels right to you.
        </p>

        <div className="mt-12 flex min-h-[260px] items-center justify-center">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onSubmit={handleSubmit}
                className="flex w-full max-w-sm flex-col gap-6 text-left"
              >
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-neutral-400">
                    Name
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-b border-neutral-200 bg-transparent pb-2 text-sm text-neutral-900 outline-none transition-colors duration-300 focus:border-neutral-500"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-neutral-400">
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="resize-none border-b border-neutral-200 bg-transparent pb-2 text-sm text-neutral-900 outline-none transition-colors duration-300 focus:border-neutral-500"
                  />
                </label>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 self-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-neutral-700 disabled:opacity-50"
                >
                  Send
                </motion.button>
              </motion.form>
            ) : (
              <motion.p
                key="thanks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-lg font-light text-neutral-700"
              >
                Thank you.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";

export default ContactSection;
