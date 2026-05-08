"use client";

import Link from "next/link";
import { Card } from "./ui";
import { PlanBadge } from "./plan-badge";
import { usePlan } from "./plan-provider";

export function HomePlanStrip() {
  const { plan } = usePlan();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <PlanBadge plan={plan} />
      <span className="text-xs text-[#9CA3AF]">Demo plan — not billed</span>
    </div>
  );
}

export function HomeMarketCta() {
  const { plan } = usePlan();

  if (plan === "free") {
    return (
      <Card className="border-[#E5E7EB] bg-white">
        <div className="mb-2 inline-flex rounded-full bg-[#FEFCE8] px-2 py-0.5 text-[10px] font-semibold text-[#A16207]">Upgrade to Pro</div>
        <h2 className="text-base font-semibold text-[#111827]">Unlock Market Price Benchmark</h2>
        <p className="mt-2 text-sm text-[#6B7280]">
          Compare your top 5 products with nearby grocery prices and find pricing opportunities.
        </p>
        <Link
          href="/profile"
          className="mt-4 flex w-full items-center justify-center rounded-2xl border border-[#0F8A3B] bg-[#ECFDF3] py-3 text-sm font-semibold text-[#0F8A3B]"
        >
          View Pro Features
        </Link>
      </Card>
    );
  }

  return (
    <Card className="border-[#0F8A3B]/25 bg-gradient-to-r from-[#ECFDF3] to-white">
      <div className="mb-2 inline-flex rounded-full bg-[#ECFDF3] px-2 py-0.5 text-[10px] font-semibold text-[#0F8A3B]">Pro insight</div>
      <h2 className="text-base font-semibold text-[#111827]">Market Price Opportunity</h2>
      <p className="mt-2 text-sm text-[#6B7280]">3 of your top 5 items are priced below nearby market averages.</p>
      <Link href="/market" className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#0F8A3B] py-3 text-sm font-semibold text-white">
        View Benchmark
      </Link>
    </Card>
  );
}
