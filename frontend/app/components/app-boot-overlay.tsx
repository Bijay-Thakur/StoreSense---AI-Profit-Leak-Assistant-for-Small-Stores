"use client";

import { useLayoutEffect, useState } from "react";
import { StoreSenseBrand } from "./storesense-logo";

const SHOW_MS = 1200;

declare global {
  interface Window {
    __storesenseBootShown?: boolean;
  }
}

export function AppBootOverlay() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "exiting">("hidden");

  useLayoutEffect(() => {
    if (window.__storesenseBootShown) return;
    window.__storesenseBootShown = true;

    const showAt = window.setTimeout(() => setPhase("visible"), 0);
    const exitAt = window.setTimeout(() => setPhase("exiting"), SHOW_MS - 250);
    const hideAt = window.setTimeout(() => setPhase("hidden"), SHOW_MS);

    return () => {
      window.clearTimeout(showAt);
      window.clearTimeout(exitAt);
      window.clearTimeout(hideAt);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#ECFDF3] via-white to-[#EFF6FF] px-6 transition-opacity duration-300 ${
        phase === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-live="polite"
      aria-label="Loading Store Sense"
    >
      <div className="splash-bg-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="splash-card relative z-10 flex w-full max-w-xs flex-col items-center px-6 py-8 sm:max-w-sm sm:px-8 sm:py-10">
        <div className="splash-logo-wrap flex w-full items-center justify-center">
          <div className="splash-logo-ring splash-logo-ring-outer" aria-hidden />
          <div className="splash-logo-ring splash-logo-ring-inner" aria-hidden />
          <StoreSenseBrand
            size="splash"
            priority
            centered
            showTagline
            className="splash-brand w-full justify-center"
          />
        </div>
        <div className="splash-progress-track mt-6 w-full max-w-[12rem]">
          <div className="splash-progress-bar splash-progress-bar-fast" />
        </div>
      </div>
    </div>
  );
}
