"use client";

import type { PlanTier } from "@/src/lib/plan";

export function PlanBadge({ plan, className = "" }: { plan: PlanTier; className?: string }) {
  const isPro = plan === "pro";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
        isPro
          ? "border-[#0F8A3B] bg-[#ECFDF3] text-[#0F8A3B]"
          : "border-[#E5E7EB] bg-white text-[#6B7280]"
      } ${className}`}
    >
      {isPro ? "Pro Plan" : "Free Plan"}
    </span>
  );
}
