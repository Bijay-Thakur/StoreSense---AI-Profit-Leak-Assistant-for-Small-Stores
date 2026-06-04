export const posSources = ["MCR POS", "Square", "Clover", "Shopify POS", "Other CSV"] as const;

export type PosSource = (typeof posSources)[number];

export const columnMappings = [
  { posColumn: "Item Code", storeSenseField: "SKU" },
  { posColumn: "Item Name", storeSenseField: "Product Name" },
  { posColumn: "Quantity Sold", storeSenseField: "Units Sold" },
  { posColumn: "Sale Price", storeSenseField: "Unit Price" },
  { posColumn: "Sale Time", storeSenseField: "Timestamp" },
  { posColumn: "Department", storeSenseField: "Category" },
] as const;

export const importSummary = {
  unitsSold: 534,
  transactions: 186,
  totalSales: 3842.65,
  lowStockItems: 7,
  reorderActions: 3,
};
