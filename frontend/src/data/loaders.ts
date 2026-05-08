import { readMockCsv } from "./csv";
import type {
  Alert,
  DailySalesSummary,
  DashboardKpi,
  HourlySalesSummary,
  InventorySnapshot,
  Invoice,
  PosSaleLine,
  Product,
  Recommendation,
  VendorCostHistory,
} from "./types";

type StrRow = Record<string, string>;

const n = (v: string) => Number(v || 0);

function mapProduct(r: StrRow): Product {
  return {
    product_id: r.product_id,
    sku: r.sku,
    product_name: r.product_name,
    category: r.category,
    vendor_id: r.vendor_id,
    vendor_name: r.vendor_name,
    unit_of_measure: r.unit_of_measure,
    product_icon: r.product_icon || "📦",
    current_sell_price: n(r.current_sell_price),
    latest_vendor_cost: n(r.latest_vendor_cost),
    previous_vendor_cost: n(r.previous_vendor_cost),
    target_margin_pct: n(r.target_margin_pct),
    current_margin_pct: n(r.current_margin_pct),
    current_stock_qty: n(r.current_stock_qty),
    reorder_point_qty: n(r.reorder_point_qty),
    recommended_reorder_qty: n(r.recommended_reorder_qty),
    units_sold_7d: n(r.units_sold_7d),
    weekly_sales_amount: n(r.weekly_sales_amount),
    days_on_hand: n(r.days_on_hand),
    demand_trend: (r.demand_trend as Product["demand_trend"]) || "Low",
    status: r.status,
    estimated_profit_impact: n(r.estimated_profit_impact),
  };
}

export async function loadProducts() {
  const rows = await readMockCsv<StrRow>("products.csv");
  return rows.map(mapProduct);
}

export async function loadPosLines(): Promise<PosSaleLine[]> {
  const rows = await readMockCsv<StrRow>("pos_sales_lines.csv");
  return rows.map((r) => ({
    transaction_id: r.transaction_id,
    timestamp: r.timestamp,
    date: r.date,
    hour: r.hour,
    product_id: r.product_id,
    product_name: r.product_name,
    category: r.category,
    quantity: n(r.quantity),
    unit_sell_price: n(r.unit_sell_price),
    line_total: n(r.line_total),
    payment_method: r.payment_method,
  }));
}

export async function loadDailySummary(): Promise<DailySalesSummary[]> {
  const rows = await readMockCsv<StrRow>("daily_sales_summary.csv");
  return rows.map((r) => ({
    date: r.date,
    transactions: n(r.transactions),
    units_sold: n(r.units_sold),
    gross_sales: n(r.gross_sales),
    estimated_cogs: n(r.estimated_cogs),
    estimated_profit: n(r.estimated_profit),
    avg_order_value: n(r.avg_order_value),
    pos_sync_status: r.pos_sync_status,
  }));
}

export async function loadHourlySummary(): Promise<HourlySalesSummary[]> {
  const rows = await readMockCsv<StrRow>("hourly_sales_summary.csv");
  return rows.map((r) => ({
    date: r.date,
    hour: r.hour,
    transactions: n(r.transactions),
    units_sold: n(r.units_sold),
    sales: n(r.sales),
  }));
}

export async function loadInventorySnapshot(): Promise<InventorySnapshot[]> {
  const rows = await readMockCsv<StrRow>("inventory_snapshot.csv");
  return rows.map((r) => ({
    product_id: r.product_id,
    sku: r.sku,
    product_name: r.product_name,
    category: r.category,
    vendor_name: r.vendor_name,
    ending_stock_qty: n(r.ending_stock_qty),
    stock_unit: r.stock_unit,
    reorder_point_qty: n(r.reorder_point_qty),
    recommended_reorder_qty: n(r.recommended_reorder_qty),
    stock_status: r.stock_status,
  }));
}

export async function loadInvoices(): Promise<Invoice[]> {
  const rows = await readMockCsv<StrRow>("vendor_invoices.csv");
  return rows.map((r) => ({
    invoice_id: r.invoice_id,
    vendor_name: r.vendor_name,
    vendor_email: r.vendor_email,
    vendor_phone: r.vendor_phone,
    invoice_number: r.invoice_number,
    invoice_date: r.invoice_date,
    due_date: r.due_date,
    amount: n(r.amount),
    status: r.status,
    urgency_color: r.urgency_color,
    days_until_due: n(r.days_until_due),
    pdf_filename: r.pdf_filename,
    source: r.source,
    reminder_48h_enabled: r.reminder_48h_enabled,
  }));
}

export async function loadCostHistory(): Promise<VendorCostHistory[]> {
  const rows = await readMockCsv<StrRow>("vendor_cost_history.csv");
  return rows.map((r) => ({
    product_id: r.product_id,
    sku: r.sku,
    product_name: r.product_name,
    vendor_name: r.vendor_name,
    week_start: r.week_start,
    unit_cost: n(r.unit_cost),
  }));
}

export async function loadRecommendations(): Promise<Recommendation[]> {
  const rows = await readMockCsv<StrRow>("reorder_recommendations.csv");
  return rows.map((r) => ({
    recommendation_id: r.recommendation_id,
    product_id: r.product_id,
    product_name: r.product_name,
    action: r.action,
    recommended_reorder_qty: n(r.recommended_reorder_qty),
    current_stock_qty: n(r.current_stock_qty),
    demand_trend: (r.demand_trend as Recommendation["demand_trend"]) || "Low",
    current_margin_pct: n(r.current_margin_pct),
    estimated_profit_impact: n(r.estimated_profit_impact),
    priority: r.priority,
    reason: r.reason,
  }));
}

export async function loadAlerts(): Promise<Alert[]> {
  const rows = await readMockCsv<StrRow>("alerts.csv");
  return rows.map((r) => ({
    alert_id: r.alert_id,
    alert_type: r.alert_type,
    severity: r.severity,
    urgency_color: r.urgency_color,
    related_entity_type: r.related_entity_type,
    related_entity_id: r.related_entity_id,
    title: r.title,
    message: r.message,
    suggested_action: r.suggested_action,
    estimated_impact: n(r.estimated_impact),
    status: r.status,
    created_at: r.created_at,
  }));
}

export async function loadDashboardKpis(): Promise<DashboardKpi[]> {
  const rows = await readMockCsv<StrRow>("dashboard_kpis.csv");
  return rows.map((r) => ({
    metric_key: r.metric_key,
    metric_label: r.metric_label,
    metric_value: r.metric_value,
    metric_display: r.metric_display,
    change_pct: r.change_pct,
    comparison: r.comparison,
    status_color: r.status_color,
  }));
}
