import { Activity, Clock3, ReceiptText, TrendingUp } from "lucide-react";
import { Card, ProductRow, ScreenHeader } from "../components/ui";
import {
  formatCurrency,
  getHourlySales,
  getTopItemsSold,
  groupTransactionsByTransactionId,
} from "@/src/data/helpers";
import { loadDailySummary, loadHourlySummary, loadPosLines, loadProducts } from "@/src/data/loaders";

export default async function SalesPage() {
  const [daily, hourly, posLines, products] = await Promise.all([
    loadDailySummary(),
    loadHourlySummary(),
    loadPosLines(),
    loadProducts(),
  ]);
  const latestDay = daily.at(-1);
  const latestDate = latestDay?.date ?? "";
  const hourlyRows = getHourlySales(hourly, latestDate);
  const transactions = groupTransactionsByTransactionId(posLines.filter((p) => p.date === latestDate)).slice(0, 6);
  const topItems = getTopItemsSold(posLines.filter((p) => p.date === latestDate), 4);
  const maxHourly = Math.max(...hourlyRows.map((h) => h.sales), 1);

  const iconFor = (id: string) => {
    const p = products.find((x) => x.product_id === id);
    return p?.product_icon ?? "📦";
  };

  return (
    <div className="space-y-4">
      <ScreenHeader
        title="POS Activity"
        subtitle="Live sales synced from your POS."
        rightSlot={<span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-medium text-[#0F8A3B]">POS connected</span>}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0F8A3B]">
            <ReceiptText className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Transactions Today</p>
          <p className="mt-1 text-xl font-semibold">{latestDay?.transactions ?? 186}</p>
        </Card>
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0F8A3B]">
            <TrendingUp className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Units Sold</p>
          <p className="mt-1 text-xl font-semibold">{latestDay?.units_sold ?? 534}</p>
        </Card>
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0F8A3B]">
            <Activity className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Sales Today</p>
          <p className="mt-1 text-xl font-semibold">{formatCurrency(latestDay?.gross_sales ?? 3842.65)}</p>
        </Card>
        <Card>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#ECFDF3] text-[#0F8A3B]">
            <Clock3 className="h-4 w-4" />
          </div>
          <p className="text-xs text-[#6B7280]">Last Sync</p>
          <p className="mt-1 text-xl font-semibold">3 min ago</p>
          <p className="text-xs text-[#0F8A3B]">Auto-sync active</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-base font-semibold">Recent Transactions</h2>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {transactions.map((t, idx) => (
            <div
              key={t.transaction_id}
              className={`rounded-2xl border p-3 ${
                idx % 3 === 0
                  ? "border-[#D1FAE5] bg-[#ECFDF3]"
                  : idx % 3 === 1
                    ? "border-[#DBEAFE] bg-[#EFF6FF]"
                    : "border-[#FEF3C7] bg-[#FFFBEB]"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-[#4B5563]">{t.time.split(" ")[1] ?? t.time}</p>
                <p className="text-sm font-semibold text-[#111827]">{formatCurrency(t.total)}</p>
              </div>
              <p className="mt-1 text-xs text-[#6B7280]">{t.lines.slice(0, 3).map((l) => l.product_name).join(", ")}</p>
              <div className="mt-2 inline-flex rounded-full bg-white/90 px-2 py-1 text-[11px] text-[#0F8A3B]">
                {t.lines.length} line items
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Top Items Sold Today</h2>
        <div className="mt-3 space-y-2">
          {topItems.map((item) => (
            <ProductRow
              key={item.product_id}
              image={`/products/${item.product_id === "P005" ? "milk" : item.product_id === "P003" ? "eggs" : item.product_id === "P001" ? "red-bull" : "coca-cola"}.svg`}
              name={`${iconFor(item.product_id)} ${item.product_name}`}
              subtitle={`${item.units} units • ${formatCurrency(item.sales)}`}
            />
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-base font-semibold">Sales Today by Hour</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl bg-[#F8FAFC] p-3 md:p-4">
          <div className="grid min-w-[560px] items-end gap-2 md:min-w-0" style={{ gridTemplateColumns: `repeat(${Math.max(hourlyRows.length, 1)}, minmax(0, 1fr))` }}>
            {hourlyRows.map((h) => {
              const pct = Math.max(6, Math.min(100, (h.sales / maxHourly) * 100));
              return (
                <div key={h.hour} className="flex min-w-0 flex-col items-center gap-1">
                  <div className="flex h-28 w-full items-end rounded-xl bg-white p-[3px] shadow-sm ring-1 ring-[#E5E7EB] md:h-32">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-[#0F8A3B] via-[#16A34A] to-[#4ADE80] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-[#6B7280]">{h.hour.replace(":00", "")}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-center text-[11px] text-[#6B7280]">Hourly sales amount (USD)</div>
        </div>
      </Card>

      <Card className="bg-[#ECFDF3]">
        <p className="text-sm text-[#14532D]">Every item sold from the POS updates stock levels automatically.</p>
        <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-1 text-xs text-[#0F8A3B]">Auto-sync enabled</span>
      </Card>
    </div>
  );
}
