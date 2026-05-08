import Image from "next/image";
import { AlertTriangle, Bell, DollarSign, Link2, Package, TrendingUp } from "lucide-react";
import { Badge, Card, ProductRow, ScreenHeader } from "./components/ui";
import { formatCurrency, getDailySalesTrend } from "@/src/data/helpers";
import { loadDailySummary, loadDashboardKpis, loadInvoices, loadProducts, loadRecommendations } from "@/src/data/loaders";

export default async function Home() {
  const [kpis, daily, recommendations, invoices, products] = await Promise.all([
    loadDashboardKpis(),
    loadDailySummary(),
    loadRecommendations(),
    loadInvoices(),
    loadProducts(),
  ]);

  const kpiMap = new Map(kpis.map((k) => [k.metric_key, k]));
  const salesKpi = kpiMap.get("todays_sales");
  const profitKpi = kpiMap.get("estimated_profit");
  const lowStockKpi = kpiMap.get("low_stock_items");
  const unpaidKpi = kpiMap.get("unpaid_invoices");
  const trendDays = getDailySalesTrend(daily).slice(-6);
  const maxSales = Math.max(...trendDays.map((d) => d.gross_sales), 1);
  const minSales = Math.min(...trendDays.map((d) => d.gross_sales), maxSales);
  const salesRange = maxSales - minSales;
  const yTicks = [maxSales, minSales + salesRange * 0.66, minSales + salesRange * 0.33, minSales];
  const chart = { left: 98, right: 24, top: 20, bottom: 36, width: 640, height: 280 };
  const plotWidth = chart.width - chart.left - chart.right;
  const plotHeight = chart.height - chart.top - chart.bottom;
  const trendPoints = trendDays.map((day, idx) => {
    const x = chart.left + idx * (plotWidth / Math.max(trendDays.length - 1, 1));
    const normalized = (day.gross_sales - minSales) / Math.max(maxSales - minSales, 1);
    const y = chart.top + (1 - normalized) * plotHeight;
    return { x, y };
  });
  const trendPath = trendPoints.reduce((acc, point, idx, arr) => {
    if (idx === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[idx - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} Q ${cx} ${prev.y}, ${point.x} ${point.y}`;
  }, "");
  const areaPath = `${trendPath} L ${trendPoints[trendPoints.length - 1]?.x ?? chart.width - chart.right} ${chart.height - chart.bottom} L ${trendPoints[0]?.x ?? chart.left} ${chart.height - chart.bottom} Z`;
  const reorderAction = recommendations.find((r) => r.product_name.includes("Red Bull"));
  const priceAction = recommendations.find((r) => r.product_id === "P005");
  const dueInvoice = invoices.find((i) => i.invoice_number === "78612") ?? invoices.find((i) => i.status === "Due Soon");
  const topProducts = [...products].sort((a, b) => b.current_margin_pct - a.current_margin_pct).slice(0, 3);

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="StoreSense"
        subtitle="Here&apos;s what&apos;s happening in your store today."
        rightSlot={
          <div className="flex items-center gap-2">
            <button type="button" className="relative rounded-full border border-[#E5E7EB] p-2 text-[#6B7280]" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#16A34A] text-[10px] text-white">3</span>
            </button>
            <Image src="/owner-avatar.svg" alt="Sam" width={36} height={36} className="rounded-full border border-[#E5E7EB]" />
          </div>
        }
      />
      <h2 className="text-[34px] font-bold leading-9 tracking-tight text-[#111827]">Good morning, Sam 👋</h2>

      <Card className="bg-gradient-to-r from-[#0F8A3B] to-green-600 py-3 text-white">
        <div className="flex items-center gap-2 text-sm">Your daily profit and reorder assistant.</div>
      </Card>

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
        <h2 className="text-base font-semibold">Today&apos;s AI Actions</h2>
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
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Daily Sales Trend (Mon-Sat)</h2>
          <TrendingUp className="h-4 w-4 text-[#0F8A3B]" />
        </div>
        <div className="mt-4 rounded-2xl bg-[#F8FAFC] p-3 md:p-4">
          {trendDays.length ? (
            <div className="space-y-2">
              <svg viewBox="0 0 640 280" className="h-52 w-full">
                <defs>
                  <linearGradient id="trendLine" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#16A34A" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0F8A3B" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="trendArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <line x1={chart.left} y1={chart.height - chart.bottom} x2={chart.width - chart.right} y2={chart.height - chart.bottom} stroke="#D1D5DB" strokeWidth="1.2" />
                {[0.25, 0.5, 0.75].map((step) => (
                  <line
                    key={step}
                    x1={chart.left}
                    y1={chart.top + plotHeight * (1 - step)}
                    x2={chart.width - chart.right}
                    y2={chart.top + plotHeight * (1 - step)}
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                  />
                ))}
                {yTicks.map((tick, i) => (
                  <g key={`${tick}-${i}`}>
                    <text
                      x={8}
                      y={i === 0 ? chart.top + 6 : i === 1 ? chart.top + plotHeight * 0.34 : i === 2 ? chart.top + plotHeight * 0.67 : chart.height - chart.bottom}
                      fontSize="12"
                      fontWeight="700"
                      fill="#374151"
                    >
                      {formatCurrency(tick)}
                    </text>
                  </g>
                ))}
                <path d={areaPath} fill="url(#trendArea)" />
                <path d={trendPath} fill="none" stroke="url(#trendLine)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
                {trendPoints.map((p, i) => (
                  <g key={`${p.x}-${i}`}>
                    <circle cx={p.x} cy={p.y} r="6" fill="#fff" stroke="#16A34A" strokeWidth="3" />
                  </g>
                ))}
              </svg>
              <div className="grid grid-cols-6 text-center text-[11px] text-[#6B7280]">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
            </div>
          ) : (
            <p className="w-full text-sm text-[#6B7280]">No trend data found.</p>
          )}
        </div>
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

      <Card>
        <div className="flex items-center gap-2 text-sm text-[#6B7280]">
          <Link2 className="h-4 w-4 text-[#0F8A3B]" />
          Every item sold from POS updates stock assumptions automatically.
        </div>
      </Card>
    </div>
  );
}
