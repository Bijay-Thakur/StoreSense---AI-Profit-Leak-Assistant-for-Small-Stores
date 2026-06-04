export const weeklyBrief = {
  executiveSummary:
    "This week, sales increased 12.6%, but vendor cost increases created margin pressure on dairy items. Red Bull and Coca-Cola are strong reorder opportunities. Kettle Chips and Sparkling Water should be reviewed before reordering. One invoice is due within 48 hours.",
  kpis: {
    weeklySales: 24671,
    estimatedProfit: 8921,
    unitsSold: 534,
    openActions: 8,
  },
  topWins: [
    "Red Bull demand is high",
    "Coca-Cola sales remain strong",
    "Starbucks Frappuccino has 42% margin",
  ],
  profitRisks: [
    "Milk Gallon margin dropped 4.6 percentage points",
    "Kettle Chips has 45 days on hand",
    "Sparkling Water margin is 12%",
  ],
  reorderPlan: [
    { product: "Red Bull", qty: "6 cases" },
    { product: "Coca-Cola", qty: "5 cases" },
    { product: "Eggs", qty: "20 cartons" },
    { product: "Starbucks Frappuccino", qty: "4 cases" },
  ],
  invoiceReminders: [
    { vendor: "Golden Supply Co.", detail: "due in 48 hours", amount: 286.4 },
    { vendor: "Fresh Dairy Co.", detail: "due soon", amount: 238.75 },
  ],
  suggestedActions: [
    "Raise Milk price to $4.99",
    "Reorder Red Bull",
    "Pay Golden Supply invoice",
    "Do not reorder Kettle Chips",
    "Review Fresh Dairy costs",
  ],
};
