export type DemandTrend = "High" | "Medium" | "Low";

export type Product = {
  product_id: string;
  sku: string;
  product_name: string;
  category: string;
  vendor_id: string;
  vendor_name: string;
  unit_of_measure: string;
  product_icon: string;
  current_sell_price: number;
  latest_vendor_cost: number;
  previous_vendor_cost: number;
  target_margin_pct: number;
  current_margin_pct: number;
  current_stock_qty: number;
  reorder_point_qty: number;
  recommended_reorder_qty: number;
  units_sold_7d: number;
  weekly_sales_amount: number;
  days_on_hand: number;
  demand_trend: DemandTrend;
  status: string;
  estimated_profit_impact: number;
};

export type PosSaleLine = {
  transaction_id: string;
  timestamp: string;
  date: string;
  hour: string;
  product_id: string;
  product_name: string;
  category: string;
  quantity: number;
  unit_sell_price: number;
  line_total: number;
  payment_method: string;
};

export type DailySalesSummary = {
  date: string;
  transactions: number;
  units_sold: number;
  gross_sales: number;
  estimated_cogs: number;
  estimated_profit: number;
  avg_order_value: number;
  pos_sync_status: string;
};

export type HourlySalesSummary = {
  date: string;
  hour: string;
  transactions: number;
  units_sold: number;
  sales: number;
};

export type InventorySnapshot = {
  product_id: string;
  sku: string;
  product_name: string;
  category: string;
  vendor_name: string;
  ending_stock_qty: number;
  stock_unit: string;
  reorder_point_qty: number;
  recommended_reorder_qty: number;
  stock_status: string;
};

export type Invoice = {
  invoice_id: string;
  vendor_name: string;
  vendor_email: string;
  vendor_phone: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  amount: number;
  status: string;
  urgency_color: string;
  days_until_due: number;
  pdf_filename: string;
  source: string;
  reminder_48h_enabled: string;
};

export type VendorCostHistory = {
  product_id: string;
  sku: string;
  product_name: string;
  vendor_name: string;
  week_start: string;
  unit_cost: number;
};

export type Recommendation = {
  recommendation_id: string;
  product_id: string;
  product_name: string;
  action: string;
  recommended_reorder_qty: number;
  current_stock_qty: number;
  demand_trend: DemandTrend;
  current_margin_pct: number;
  estimated_profit_impact: number;
  priority: string;
  reason: string;
};

export type Alert = {
  alert_id: string;
  alert_type: string;
  severity: string;
  urgency_color: string;
  related_entity_type: string;
  related_entity_id: string;
  title: string;
  message: string;
  suggested_action: string;
  estimated_impact: number;
  status: string;
  created_at: string;
};

export type DashboardKpi = {
  metric_key: string;
  metric_label: string;
  metric_value: string;
  metric_display: string;
  change_pct: string;
  comparison: string;
  status_color: string;
};
