"use client";

import type { PlanTier } from "@/src/lib/plan";

const freeFeatures = [
  "POS sales dashboard",
  "Inventory tracking",
  "Reorder recommendations",
  "Invoice tracking",
  "Profit-leak alerts",
  "Basic product insights",
];

const proFeatures = [
  "Everything in Free",
  "Market Price Benchmark",
  "Nearby competitor price comparison",
  "Top 5 popular item analysis",
  "Suggested price actions",
  "Business analyst consultation",
  "Monthly growth report preview",
];

export function PlanCard({
  tier,
  selected,
  onSelect,
  recommended,
  current,
}: {
  tier: PlanTier;
  selected: boolean;
  onSelect: () => void;
  recommended?: boolean;
  current?: boolean;
}) {
  const isPro = tier === "pro";
  const title = isPro ? "Pro Plan" : "Free Plan";
  const price = isPro ? "$99 / month" : "$49 / month";
  const features = isPro ? proFeatures : freeFeatures;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-3xl border p-4 text-left shadow-sm transition ${
        selected ? "border-[#0F8A3B] bg-[#ECFDF3] ring-2 ring-[#0F8A3B]/25" : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
        {current ? (
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-[#0F8A3B] ring-1 ring-[#0F8A3B]/30">Current Plan</span>
        ) : null}
        {recommended ? (
          <span className="rounded-full bg-[#FFF7ED] px-2 py-0.5 text-[10px] font-semibold text-[#D97706]">Recommended</span>
        ) : null}
      </div>
      <p className="mt-1 text-sm font-medium text-[#0F8A3B]">{price}</p>
      <p className="mt-2 text-xs text-[#6B7280]">{isPro ? "Premium market intelligence for your store." : "Operations essentials for day-to-day running."}</p>
      <ul className="mt-3 space-y-1.5 text-xs text-[#374151]">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span className="text-[#0F8A3B]">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}
