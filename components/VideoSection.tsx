"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function VideoSection({ onEnded }: { onEnded: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mx-auto w-full max-w-[900px]"
      >
        <div className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.35)]">
          {!hasError ? (
            <video
              ref={videoRef}
              src="/video/message.mp4"
              controls={isPlaying}
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              onEnded={onEnded}
              onError={() => setHasError(true)}
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-neutral-400">
              The video will appear here.
            </div>
          )}

          {!isPlaying && !hasError && (
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-500 hover:bg-black/10"
            >
              <motion.span
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5z" fill="#111111" />
                </svg>
              </motion.span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
