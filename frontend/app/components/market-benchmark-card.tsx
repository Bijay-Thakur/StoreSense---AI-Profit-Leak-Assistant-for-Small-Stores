"use client";

import { Badge, Card } from "./ui";
import { formatCurrency } from "@/src/data/helpers";
import type { MarketBenchmarkItem } from "@/src/data/marketBenchmarks";

function statusTone(s: string): "green" | "red" | "orange" | "blue" | "gray" {
  if (s.includes("Opportunity")) return "orange";
  if (s.includes("Competitive")) return "green";
  if (s.includes("Do Not")) return "red";
  if (s.includes("Below")) return "blue";
  return "gray";
}

export function MarketBenchmarkCard({ item }: { item: MarketBenchmarkItem }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] text-2xl">{item.product_icon}</div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-[#111827]">{item.product_name}</h3>
            <Badge text={item.status} tone={statusTone(item.status)} />
          </div>
          <p className="mt-0.5 text-xs text-[#6B7280]">{item.category}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <div>
              <p className="text-[#9CA3AF]">Your price</p>
              <p className="font-semibold text-[#111827]">{formatCurrency(item.your_price)}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF]">Nearby avg</p>
              <p className="font-semibold text-[#111827]">{formatCurrency(item.nearby_avg_price)}</p>
            </div>
            <div>
              <p className="text-[#9CA3AF]">Low / high</p>
              <p className="font-semibold text-[#111827]">
                {formatCurrency(item.lowest_competitor_price)} – {formatCurrency(item.highest_competitor_price)}
              </p>
            </div>
            <div>
              <p className="text-[#9CA3AF]">vs avg</p>
              <p className={`font-semibold ${item.difference_pct < 0 ? "text-[#2563EB]" : "text-[#DC2626]"}`}>
                {item.difference_pct > 0 ? "+" : ""}
                {item.difference_pct.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="mt-3 rounded-2xl bg-[#F8FAFC] p-3 text-xs leading-relaxed text-[#374151]">
            <span className="font-semibold text-[#111827]">Suggested action: </span>
            {item.suggested_action}
          </p>
          <p className="mt-2 text-[10px] text-[#9CA3AF]">Demo benchmark • {item.market_area}</p>
        </div>
      </div>
    </Card>
  );
}
