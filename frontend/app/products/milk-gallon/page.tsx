import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HeaderActions } from "../../components/header-actions";
import { Badge, Card, ProductAvatar, ScreenHeader } from "../../components/ui";
import { formatCurrency } from "@/src/data/helpers";
import { loadCostHistory, loadProducts } from "@/src/data/loaders";

export default async function MilkInsightPage() {
  const [products, costHistory] = await Promise.all([loadProducts(), loadCostHistory()]);
  const milk = products.find((p) => p.product_id === "P005");
  const trend = costHistory.filter((c) => c.product_id === "P005").slice(-8);

  if (!milk) {
    return (
      <div className="space-y-4">
        <ScreenHeader title="Product Insight" subtitle="Monitor product margin and vendor changes" rightSlot={<HeaderActions />} />
        <Card className="border-[#FCA5A5] bg-[#FEF2F2]">
          <p className="text-sm text-[#991B1B]">Missing milk product data.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="Product Insight"
        subtitle="Monitor product margin and vendor changes"
        rightSlot={
          <HeaderActions>
            <Link href="/products" className="rounded-full border border-[#E5E7EB] p-2 text-[#6B7280]" aria-label="Back to products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </HeaderActions>
        }
      />
      <Card>
        <div className="flex items-center gap-3">
          <ProductAvatar image="/products/milk.svg" name={milk.product_name} />
          <div>
            <p className="font-semibold">{milk.product_name}</p>
            <p className="text-xs text-[#6B7280]">{milk.category} • {milk.vendor_name}</p>
          </div>
          <div className="ml-auto">
            <Badge text={milk.status} tone="red" />
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-xs text-[#6B7280]">Current Sell Price</p>
          <p className="mt-1 text-lg font-semibold">{formatCurrency(milk.current_sell_price)}</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Latest Vendor Cost</p>
          <p className="mt-1 text-lg font-semibold">{formatCurrency(milk.latest_vendor_cost)}</p>
          <p className="text-xs text-[#DC2626]">+8.2%</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Margin</p>
          <p className="mt-1 text-lg font-semibold">{milk.current_margin_pct}%</p>
          <p className="text-xs text-[#DC2626]">Down 4.6pp</p>
        </Card>
        <Card>
          <p className="text-xs text-[#6B7280]">Weekly Units Sold</p>
          <p className="mt-1 text-lg font-semibold">{milk.units_sold_7d}</p>
          <p className="text-xs text-[#0F8A3B]">+6.3%</p>
        </Card>
      </div>
      <Card>
        <p className="text-xs text-[#6B7280]">Days on Hand</p>
        <p className="text-lg font-semibold">
          {milk.days_on_hand} <span className="text-sm text-[#0F8A3B]">Good</span>
        </p>
      </Card>
      <Card>
        <h2 className="text-base font-semibold">Vendor Cost Trend</h2>
        <div className="mt-4 rounded-2xl bg-[#F8FAFC] p-3">
          <div className="flex items-end gap-2">
            {trend.map((point) => {
              const height = ((point.unit_cost - 2.2) / (3.2 - 2.2)) * 100;
              return (
                <div key={point.week_start} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-28 w-full items-end rounded-xl bg-white px-1 pb-1">
                    <div className="w-full rounded-lg bg-[#DC2626]" style={{ height: `${Math.max(height, 8)}%` }} />
                  </div>
                  <p className="text-[10px] text-[#6B7280]">{point.week_start.slice(5)}</p>
                  <p className="text-xs font-semibold">{formatCurrency(point.unit_cost)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      <Card className="bg-[#FEF2F2]">
        <h2 className="text-base font-semibold">AI Analysis</h2>
        <p className="mt-2 text-sm text-[#374151]">
          Your vendor cost has increased 8.2% while the selling price has stayed the same, reducing your margin by 4.6 percentage points.
        </p>
      </Card>
      <Card>
        <h2 className="text-base font-semibold">Recommended Actions</h2>
        <ol className="mt-2 space-y-2 text-sm">
          <li>
            1. Raise price to <span className="font-semibold">$4.99</span>
          </li>
          <li>
            2. Expected weekly profit impact <span className="font-semibold text-[#0F8A3B]">+$96</span>
          </li>
          <li>
            3. Reorder only <span className="font-semibold">12 units</span> this week
          </li>
        </ol>
      </Card>
      <Card>
        <h2 className="text-base font-semibold">Why this matters</h2>
        <p className="mt-2 text-sm text-[#374151]">
          Rising costs are eating into your profits. Taking action now can recover $96 in profit every week.
        </p>
        <p className="mt-2 text-sm text-[#374151]">
          Maintaining the right balance between price and stock keeps customers satisfied and shelves stocked.
        </p>
      </Card>
    </div>
  );
}
