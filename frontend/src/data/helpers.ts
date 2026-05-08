import type {
  Alert,
  DailySalesSummary,
  HourlySalesSummary,
  Invoice,
  PosSaleLine,
  Product,
  Recommendation,
} from "./types";

export const formatCurrency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export function getStatusColor(status: string) {
  if (/profit leak|overdue|high/i.test(status)) return "red";
  if (/due soon|low stock|reorder soon|medium/i.test(status)) return "orange";
  if (/resolved|paid|healthy|profitable|connected|active/i.test(status)) return "green";
  return "blue";
}

export function getUrgencyColor(urgency: string) {
  if (urgency === "red") return "red";
  if (urgency === "orange") return "orange";
  if (urgency === "yellow") return "orange";
  if (urgency === "green") return "green";
  return "blue";
}

export const getProductById = (products: Product[], id: string) => products.find((p) => p.product_id === id);

export const getRecommendationsByAction = (recommendations: Recommendation[], action: string) =>
  recommendations.filter((r) => r.action.toLowerCase() === action.toLowerCase());

export function getInvoiceSummary(invoices: Invoice[]) {
  const paid = invoices.filter((i) => i.status.toLowerCase() === "paid").length;
  const dueSoon = invoices.filter((i) => i.status.toLowerCase() === "due soon").length;
  const overdue = invoices.filter((i) => i.status.toLowerCase() === "overdue").length;
  const outstanding = invoices
    .filter((i) => i.status.toLowerCase() !== "paid")
    .reduce((acc, i) => acc + i.amount, 0);
  return { paid, dueSoon, overdue, outstanding };
}

export function getAlertsSummary(alerts: Alert[]) {
  const urgent = alerts.filter((a) => a.severity.toLowerCase() === "high" && a.status.toLowerCase() !== "resolved").length;
  const medium = alerts.filter((a) => a.severity.toLowerCase() === "medium" && a.status.toLowerCase() !== "resolved").length;
  const resolved = alerts.filter((a) => a.status.toLowerCase() === "resolved").length;
  return { urgent, medium, resolved };
}

export function groupTransactionsByTransactionId(posLines: PosSaleLine[]) {
  const map = new Map<string, PosSaleLine[]>();
  for (const line of posLines) {
    const existing = map.get(line.transaction_id) ?? [];
    existing.push(line);
    map.set(line.transaction_id, existing);
  }
  return [...map.entries()]
    .map(([transaction_id, lines]) => {
      const total = lines.reduce((acc, l) => acc + l.line_total, 0);
      const time = lines[0]?.timestamp ?? "";
      return { transaction_id, lines, total, time };
    })
    .sort((a, b) => (a.time < b.time ? 1 : -1));
}

export function getTopItemsSold(posLines: PosSaleLine[], limit = 5) {
  const map = new Map<
    string,
    { product_id: string; product_name: string; units: number; sales: number; category: string }
  >();
  for (const line of posLines) {
    const existing = map.get(line.product_id) ?? {
      product_id: line.product_id,
      product_name: line.product_name,
      units: 0,
      sales: 0,
      category: line.category,
    };
    existing.units += line.quantity;
    existing.sales += line.line_total;
    map.set(line.product_id, existing);
  }
  return [...map.values()].sort((a, b) => b.units - a.units).slice(0, limit);
}

export function getHourlySales(hourlySummary: HourlySalesSummary[], date: string) {
  return hourlySummary
    .filter((h) => h.date === date)
    .sort((a, b) => (a.hour > b.hour ? 1 : -1));
}

export const getDailySalesTrend = (dailySummary: DailySalesSummary[]) =>
  [...dailySummary].sort((a, b) => (a.date > b.date ? 1 : -1));
