StoreSense Mock Data Pack

Purpose:
This mock dataset supports the updated StoreSense MVP:
a POS-connected reorder, invoice, and profit-leak assistant for small stores.

Recommended use:
- Use products.csv as the product catalog.
- Use pos_sales_lines.csv for the POS Activity screen and sales calculations.
- Use daily_sales_summary.csv and hourly_sales_summary.csv for charts.
- Use inventory_snapshot.csv and reorder_recommendations.csv for reorder/inventory screens.
- Use vendor_invoices.csv and vendor_invoice_lines.csv for invoice tracking.
- Use vendor_cost_history.csv for product-level cost trend charts.
- Use alerts.csv for the Alerts screen.
- Use dashboard_kpis.csv if you want fixed placeholder dashboard values matching the mockups.

Why one week of sales data?
One week is enough for the hackathon presentation dashboard:
daily sales trend, POS activity, units sold, top items, and basic reorder suggestions.

Why eight weeks of vendor cost history?
Product insight charts need historical comparison to show vendor cost increases and profit leaks.
Milk Gallon is intentionally configured as a profit-leak example.
