"use client";

import { useState } from "react";
import BlurredBackground from "./BlurredBackground";

export default function PasswordGate({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    setPassword("");
    setTimeout(() => setShake(false), 500);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        onSuccess();
        return;
      }
      triggerShake();
    } catch {
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      <BlurredBackground />

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-neutral-100 bg-white/70 p-10 text-center shadow-[0_8px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
        <h1 className="text-2xl font-medium tracking-tight text-neutral-900">
          hapines<span className="text-neutral-400">_f</span>
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          A small place made for one person.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className={`w-full rounded-full border border-neutral-200 bg-white px-5 py-3 text-center text-sm text-neutral-900 outline-none transition-colors duration-300 focus:border-neutral-400 ${
              shake ? "animate-shake" : ""
            }`}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-neutral-900 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-neutral-700 disabled:opacity-50"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
