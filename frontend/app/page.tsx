import Link from "next/link";
import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import { DailySalesTrendChart } from "./components/daily-sales-trend-chart";
import { HeaderActions } from "./components/header-actions";
import { HomePlanStrip } from "./components/home-plan-features";
import { AiInsightsCta } from "./components/ai-insights-cta";
import { OperationsHubSection } from "./components/operations-hub-section";
import { PosFitCard } from "./components/pos-fit-card";
import { StoreSenseBrand } from "./components/storesense-logo";
import { Badge, Card, ProductRow, ScreenHeader } from "./components/ui";
import { formatCurrency } from "@/src/data/helpers";
import { loadDashboardKpis, loadInvoices, loadProducts, loadRecommendations } from "@/src/data/loaders";

export default async function Home() {
  const [kpis, recommendations, invoices, products] = await Promise.all([
    loadDashboardKpis(),
    loadRecommendations(),
    loadInvoices(),
    loadProducts(),
  ]);

  const kpiMap = new Map(kpis.map((k) => [k.metric_key, k]));
  const salesKpi = kpiMap.get("todays_sales");
  const profitKpi = kpiMap.get("estimated_profit");
  const lowStockKpi = kpiMap.get("low_stock_items");
  const unpaidKpi = kpiMap.get("unpaid_invoices");
  const reorderAction = recommendations.find((r) => r.product_name.includes("Red Bull"));
  const priceAction = recommendations.find((r) => r.product_id === "P005");
  const dueInvoice = invoices.find((i) => i.invoice_number === "78612") ?? invoices.find((i) => i.status === "Due Soon");
  const topProducts = [...products].sort((a, b) => b.current_margin_pct - a.current_margin_pct).slice(0, 3);

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="StoreSense"
        titleNode={<StoreSenseBrand size="lg" priority />}
        subtitle="Here&apos;s what&apos;s happening in your store today."
        rightSlot={<HeaderActions />}
      />
      <div className="space-y-2">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#111827] sm:text-3xl md:text-[34px] md:leading-9">Good morning, Sam 👋</h2>
        <HomePlanStrip />
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0F8A3B]">
            <DollarSign className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Today&apos;s Sales</p>
          <p className="mt-2 text-xl font-semibold">{salesKpi?.metric_display ?? formatCurrency(3842.65)}</p>
          <p className="mt-1 text-xs text-[#0F8A3B]">{salesKpi?.change_pct ? `+${salesKpi.change_pct}% ${salesKpi.comparison}` : "+12.6% vs yesterday"}</p>
        </Card>
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0F8A3B]">
            <TrendingUp className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Estimated Profit</p>
          <p className="mt-2 text-xl font-semibold">{profitKpi?.metric_display ?? formatCurrency(1246.3)}</p>
          <p className="mt-1 text-xs text-[#0F8A3B]">{profitKpi?.change_pct ? `+${profitKpi.change_pct}% ${profitKpi.comparison}` : "+18.4% vs yesterday"}</p>
        </Card>
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF7ED] text-[#F59E0B]">
            <Package className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Low Stock</p>
          <p className="mt-2 text-xl font-semibold">{lowStockKpi?.metric_display ?? "7 items"}</p>
          <p className="mt-1 text-xs text-[#D97706]">View items</p>
        </Card>
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Unpaid Invoices</p>
          <p className="mt-2 text-xl font-semibold">{unpaidKpi?.metric_display ?? "$1,184"}</p>
          <p className="mt-1 text-xs text-[#DC2626]">Needs attention</p>
        </Card>
      </div>

      <Card>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded-2xl bg-[#ECFDF3] p-2 text-center text-[#0F8A3B]">POS sync: Connected</div>
          <div className="rounded-2xl bg-[#ECFDF3] p-2 text-center text-[#0F8A3B]">Invoice tracking: Active</div>
          <div className="rounded-2xl bg-[#ECFDF3] p-2 text-center text-[#0F8A3B]">Actions: AI ready</div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Today&apos;s top actions</h2>
          <Link href="/actions" className="text-xs font-semibold text-[#0F8A3B]">
            View all 8 →
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {reorderAction ? (
            <div className="rounded-2xl bg-[#ECFDF3] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-2xl">🥤</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Reorder Red Bull</p>
                  <p className="text-xs text-[#6B7280]">Fast seller, 2 cases left</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge text="High demand" tone="green" />
                    <span className="text-sm font-semibold text-[#0F8A3B]">+${reorderAction.estimated_profit_impact} Profit</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {priceAction ? (
            <div className="rounded-2xl bg-[#FFF7ED] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-2xl">🥛</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Raise Milk price to $4.99</p>
                  <p className="text-xs text-[#6B7280]">Vendor cost increased</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge text="Price optimization" tone="orange" />
                    <span className="text-sm font-semibold text-[#0F8A3B]">+${priceAction.estimated_profit_impact} Profit/week</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {dueInvoice ? (
            <div className="rounded-2xl bg-[#FEFCE8] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-2xl">📄</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Invoice due in 48 hours</p>
                  <p className="text-xs text-[#6B7280]">{dueInvoice.vendor_name} • Due {dueInvoice.due_date}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge text={`Invoice #${dueInvoice.invoice_number}`} tone="orange" />
                    <span className="text-sm font-semibold text-[#111827]">{formatCurrency(dueInvoice.amount)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Card>

      <Card>
        <DailySalesTrendChart />
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Top Profitable Products</h2>
        <div className="mt-3 space-y-2">
          {!topProducts.length ? (
            <p className="text-sm text-[#6B7280]">No product data.</p>
          ) : (
            topProducts.map((row) => (
              <ProductRow
                key={row.product_id}
                image={`/products/${row.product_id === "P005" ? "milk" : row.product_id === "P004" ? "frappuccino" : row.product_id === "P038" ? "almonds" : "coca-cola"}.svg`}
                name={row.product_name}
                subtitle={row.category}
                trailing={<Badge text={`${row.current_margin_pct}% margin`} tone="green" />}
              />
            ))
          )}
        </div>
      </Card>

      <AiInsightsCta
        title="Ask StoreSense AI"
        text="Ask questions like “What should I reorder this week?” or “Which invoices are due soon?”"
        buttonLabel="Open AI Insights"
      />

      <OperationsHubSection />

      <PosFitCard />
    </div>
  );
}
