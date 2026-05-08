import { ArrowRight } from "lucide-react";
import { Badge, Card, ProductRow, ScreenHeader } from "../components/ui";
import { formatCurrency } from "@/src/data/helpers";
import { loadInventorySnapshot, loadProducts, loadRecommendations } from "@/src/data/loaders";

export default async function ProductsPage() {
  const [products, recommendations, inventory] = await Promise.all([
    loadProducts(),
    loadRecommendations(),
    loadInventorySnapshot(),
  ]);
  const reorders = recommendations.filter((r) => r.action === "Reorder").slice(0, 4);
  const skips = recommendations.filter((r) => r.action === "Do Not Reorder").slice(0, 2);
  const invById = new Map(inventory.map((i) => [i.product_id, i]));

  const imageById = (id: string) =>
    id === "P001"
      ? "/products/red-bull.svg"
      : id === "P002"
        ? "/products/coca-cola.svg"
        : id === "P003"
          ? "/products/eggs.svg"
          : id === "P004"
            ? "/products/frappuccino.svg"
            : id === "P005"
              ? "/products/milk.svg"
              : id === "P006"
                ? "/products/kettle-chips.svg"
                : id === "P007"
                  ? "/products/sparkling-water.svg"
                  : "/products/almonds.svg";

  return (
    <div className="space-y-4">
      <ScreenHeader title="AI Reorder Plan" subtitle="What to buy this week" />

      <Card className="bg-[#ECFDF3]">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-xs text-[#6B7280]">Total Estimated Spend</p>
            <p className="font-semibold">{formatCurrency(1248.5)}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Expected Revenue Impact</p>
            <p className="font-semibold text-[#0F8A3B]">+{formatCurrency(4231)}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Priority</p>
            <p className="font-semibold">High</p>
          </div>
        </div>
        <p className="mt-2 text-xs text-[#0F8A3B]">Strong opportunity</p>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Recommended Reorders</h2>
        <div className="mt-3 space-y-2">
          {reorders.map((r) => (
            <ProductRow
              key={r.recommendation_id}
              image={imageById(r.product_id)}
              name={r.product_name}
              subtitle={`Current stock: ${r.current_stock_qty} • Reorder qty: ${r.recommended_reorder_qty} • Demand: ${r.demand_trend}`}
              trailing={<span className="text-xs font-semibold text-[#0F8A3B]">+${r.estimated_profit_impact}</span>}
            />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Do Not Reorder</h2>
        <div className="mt-3 space-y-2">
          {skips.map((s) => (
            <ProductRow
              key={s.recommendation_id}
              image={imageById(s.product_id)}
              name={s.product_name}
              subtitle={s.product_id === "P006" ? "Low turnover • 45 days on hand" : "Weak margin • 12% margin"}
              trailing={<span className="text-xs font-semibold text-[#DC2626]">${s.estimated_profit_impact}</span>}
            />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">This week&apos;s strategy</h2>
        <p className="mt-2 text-sm text-[#374151]">
          Focus on high-demand energy drinks and seasonal beverages driving the most profit. Skip slow-moving snacks with low turnover and weak margins. This balanced order helps boost sales while reducing excess inventory.
        </p>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Products List</h2>
        <div className="mt-3 space-y-2">
          {products.slice(0, 10).map((p) => {
            const inv = invById.get(p.product_id);
            return (
              <ProductRow
                key={p.product_id}
                image={imageById(p.product_id)}
                name={p.product_name}
                subtitle={`${p.category} • ${p.vendor_name} • Stock ${inv?.ending_stock_qty ?? p.current_stock_qty}`}
                trailing={<Badge text={p.status} tone={p.status.includes("Profit Leak") ? "red" : p.status.includes("Low") ? "orange" : "green"} />}
                href={p.product_id === "P005" ? "/products/milk-gallon" : undefined}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-[#6B7280]">
          Swipe for more products <ArrowRight className="h-3 w-3" />
        </div>
      </Card>
    </div>
  );
}
