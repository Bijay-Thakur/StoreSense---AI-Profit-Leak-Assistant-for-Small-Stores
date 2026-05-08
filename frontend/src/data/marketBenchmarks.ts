export type MarketBenchmarkItem = {
  product_id: string;
  product_name: string;
  product_icon: string;
  category: string;
  your_price: number;
  nearby_avg_price: number;
  lowest_competitor_price: number;
  highest_competitor_price: number;
  difference_pct: number;
  status: string;
  suggested_action: string;
  market_area: string;
};

/** Demo benchmark data — not live market data. */
export const marketBenchmarks: MarketBenchmarkItem[] = [
  {
    product_id: "P005",
    product_name: "Milk Gallon",
    product_icon: "🥛",
    category: "Dairy",
    your_price: 4.49,
    nearby_avg_price: 4.79,
    lowest_competitor_price: 4.29,
    highest_competitor_price: 5.19,
    difference_pct: -6.3,
    status: "Below Market",
    suggested_action:
      "You are slightly below market. Keep price or raise carefully to $4.79.",
    market_area: "Queens, NY",
  },
  {
    product_id: "P001",
    product_name: "Red Bull 24ct",
    product_icon: "🥤",
    category: "Beverages",
    your_price: 38.99,
    nearby_avg_price: 41.49,
    lowest_competitor_price: 37.99,
    highest_competitor_price: 44.99,
    difference_pct: -6.0,
    status: "Pricing Opportunity",
    suggested_action: "Strong demand and below market average. Consider raising price moderately.",
    market_area: "Queens, NY",
  },
  {
    product_id: "P002",
    product_name: "Coca-Cola 12oz",
    product_icon: "🥤",
    category: "Beverages",
    your_price: 8.99,
    nearby_avg_price: 9.49,
    lowest_competitor_price: 8.49,
    highest_competitor_price: 10.99,
    difference_pct: -5.3,
    status: "Competitive",
    suggested_action: "Price is competitive. Keep current price if sales volume is strong.",
    market_area: "Queens, NY",
  },
  {
    product_id: "P003",
    product_name: "Eggs 12ct",
    product_icon: "🥚",
    category: "Dairy",
    your_price: 3.99,
    nearby_avg_price: 4.29,
    lowest_competitor_price: 3.79,
    highest_competitor_price: 4.99,
    difference_pct: -7.0,
    status: "Pricing Opportunity",
    suggested_action: "Below market and selling well. Consider a small price increase.",
    market_area: "Queens, NY",
  },
  {
    product_id: "P006",
    product_name: "Kettle Chips",
    product_icon: "🥔",
    category: "Snacks",
    your_price: 2.49,
    nearby_avg_price: 2.99,
    lowest_competitor_price: 2.29,
    highest_competitor_price: 3.49,
    difference_pct: -16.7,
    status: "Do Not Reorder",
    suggested_action: "Price is low but item is slow-moving. Do not reorder until inventory clears.",
    market_area: "Queens, NY",
  },
];

export function getMarketBenchmarkSummary(items: MarketBenchmarkItem[]) {
  const n = items.length;
  const avgGap =
    n === 0 ? 0 : items.reduce((acc, i) => acc + i.difference_pct, 0) / n;
  const opportunities = items.filter((i) => i.status === "Pricing Opportunity").length;
  const area = items[0]?.market_area ?? "Queens, NY";
  return {
    itemsCompared: n,
    avgPriceGapPct: avgGap,
    pricingOpportunities: opportunities,
    marketArea: area,
  };
}
