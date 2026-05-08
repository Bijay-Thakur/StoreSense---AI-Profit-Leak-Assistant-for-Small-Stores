"use client";

import Link from "next/link";
import { AnalystConsultationCard } from "../components/analyst-consultation-card";
import { HeaderActions } from "../components/header-actions";
import { MarketBenchmarkCard } from "../components/market-benchmark-card";
import { PriceComparisonChart } from "../components/price-comparison-chart";
import { usePlan } from "../components/plan-provider";
import { UpgradeCard } from "../components/upgrade-card";
import { Card, ScreenHeader } from "../components/ui";
import { getMarketBenchmarkSummary, marketBenchmarks } from "@/src/data/marketBenchmarks";

const DEMO_SUMMARY = {
  /** Illustrative headline figure for the demo (not a live index). */
  avgPriceGapDisplay: "+6.8%",
  pricingOpportunities: 3,
};

export default function MarketPage() {
  const { isPro, setPlan } = usePlan();
  const computed = getMarketBenchmarkSummary(marketBenchmarks);

  if (!isPro) {
    return (
      <div className="space-y-4">
        <ScreenHeader
          title="Market Price Benchmark"
          subtitle="Pro feature preview"
          rightSlot={<HeaderActions />}
        />
        <UpgradeCard
          title="Market Price Benchmark is a Pro feature"
          description="Compare your top-selling products with nearby market averages and identify pricing opportunities. Shown data is mock benchmark data for demo only."
          buttonText="Preview Pro Plan"
          onPreviewPro={() => setPlan("pro")}
        />
        <p className="text-center text-xs text-[#9CA3AF]">
          Want to explore plans first?{" "}
          <Link href="/profile" className="font-medium text-[#0F8A3B] underline-offset-2 hover:underline">
            Open Profile
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="Market Price Benchmark"
        subtitle="Compare your top items with nearby grocery and retailer prices."
        rightSlot={<HeaderActions />}
      />

      <p className="rounded-2xl border border-[#E5E7EB] bg-[#FEFCE8] px-3 py-2 text-xs text-[#854D0E]">
        Demo benchmark data for Queens, NY — not live competitor pricing.
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <p className="text-xs text-[#6B7280]">Items compared</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">{computed.itemsCompared}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Avg price gap</p>
          <p className="mt-1 text-xl font-semibold text-[#2563EB]">{DEMO_SUMMARY.avgPriceGapDisplay}</p>
          <p className="mt-0.5 text-[10px] text-[#9CA3AF]">Illustrative vs nearby avg</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Pricing opportunities</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">{DEMO_SUMMARY.pricingOpportunities}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Market area</p>
          <p className="mt-1 text-xl font-semibold text-[#111827]">{computed.marketArea}</p>
        </Card>
      </div>

      <div>
        <h2 className="text-base font-semibold text-[#111827]">Top 5 popular items</h2>
        <p className="mt-1 text-xs text-[#6B7280]">Your price vs nearby basket (demo)</p>
        <div className="mt-4 space-y-3">
          {marketBenchmarks.map((item) => (
            <MarketBenchmarkCard key={item.product_id} item={item} />
          ))}
        </div>
      </div>

      <Card>
        <h2 className="text-base font-semibold text-[#111827]">Price comparison</h2>
        <div className="mt-4">
          <PriceComparisonChart items={marketBenchmarks} />
        </div>
        <div className="mt-4 flex gap-4 border-t border-[#F3F4F6] pt-3 text-[10px] text-[#6B7280]">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#0F8A3B]" /> Your price
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-[#93C5FD]" /> Nearby average
          </span>
        </div>
      </Card>

      <Card className="border-[#2563EB]/20 bg-blue-50/50">
        <h2 className="text-base font-semibold text-[#111827]">Market insight</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#374151]">
          Your most popular products are generally priced below the nearby market average. Red Bull, Eggs, and Milk show room for careful price increases
          without losing competitiveness. Kettle Chips should not be reordered because low price is not improving turnover.
        </p>
      </Card>

      <AnalystConsultationCard />

      <p className="pb-2 text-center text-[10px] text-[#9CA3AF]">Figures shown are simulated for demo purposes only.</p>
    </div>
  );
}
