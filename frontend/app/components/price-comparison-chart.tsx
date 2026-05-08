"use client";

import { formatCurrency } from "@/src/data/helpers";
import type { MarketBenchmarkItem } from "@/src/data/marketBenchmarks";

export function PriceComparisonChart({ items }: { items: MarketBenchmarkItem[] }) {
  const maxVal = Math.max(...items.flatMap((i) => [i.your_price, i.nearby_avg_price]), 0.01);

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#6B7280]">Your price vs nearby average (demo data)</p>
      {items.map((item) => {
        const yourPct = (item.your_price / maxVal) * 100;
        const avgPct = (item.nearby_avg_price / maxVal) * 100;
        return (
          <div key={item.product_id}>
            <div className="mb-1 flex justify-between text-xs font-medium text-[#111827]">
              <span className="truncate pr-2">{item.product_name}</span>
              <span className="shrink-0 text-[#6B7280]">{formatCurrency(item.your_price)} vs {formatCurrency(item.nearby_avg_price)}</span>
            </div>
            <div className="flex h-8 gap-2">
              <div className="flex-1 overflow-hidden rounded-xl bg-[#F3F4F6]">
                <div
                  className="h-full rounded-xl bg-[#0F8A3B] transition-all"
                  style={{ width: `${yourPct}%`, minWidth: yourPct > 0 ? "4px" : 0 }}
                  title={`Your price ${formatCurrency(item.your_price)}`}
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-xl bg-[#F3F4F6]">
                <div
                  className="h-full rounded-xl bg-[#93C5FD]"
                  style={{ width: `${avgPct}%`, minWidth: avgPct > 0 ? "4px" : 0 }}
                  title={`Nearby avg ${formatCurrency(item.nearby_avg_price)}`}
                />
              </div>
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-[#9CA3AF]">
              <span>Your price</span>
              <span>Nearby average</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
