"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PasswordGate from "./PasswordGate";
import BeforeYouContinue from "./BeforeYouContinue";
import VideoSection from "./VideoSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

type Stage = "gate" | "message" | "content";

const UNLOCK_KEY = "hapinesf_unlocked";

export default function HomeExperience() {
  const [stage, setStage] = useState<Stage>("gate");
  const contactRef = useRef<HTMLDivElement>(null);

  // If she already unlocked it earlier in this browser session, skip
  // straight past the password screen on a refresh.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(UNLOCK_KEY) === "true") {
        setStage("message");
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing edge cases) — no problem, just start at the gate.
    }
  }, []);

  const handleUnlock = () => {
    try {
      sessionStorage.setItem(UNLOCK_KEY, "true");
    } catch {
      // ignore
    }
    setStage("message");
  };

  const handleContinue = () => setStage("content");

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {stage === "gate" && (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <PasswordGate onSuccess={handleUnlock} />
          </motion.div>
        )}

        {stage === "message" && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <BeforeYouContinue onContinue={handleContinue} />
          </motion.div>
        )}

        {stage === "content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <VideoSection onEnded={scrollToContact} />
            <ContactSection ref={contactRef} />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
