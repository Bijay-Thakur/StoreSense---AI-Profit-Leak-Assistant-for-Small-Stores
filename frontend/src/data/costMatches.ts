export type CostMatchStatus = "Auto Match" | "Review";

export type CostMatch = {
  id: string;
  invoiceItem: string;
  posProduct: string;
  vendor: string;
  confidence: number;
  status: CostMatchStatus;
  actionLabel: string;
};

export const costMatchSummary = {
  invoiceItems: 18,
  autoMatched: 14,
  needsReview: 4,
  avgConfidence: 91,
};

export const costMatches: CostMatch[] = [
  {
    id: "cm1",
    invoiceItem: "Milk Gallon 1%",
    posProduct: "Milk Gallon",
    vendor: "Fresh Dairy Co.",
    confidence: 96,
    status: "Auto Match",
    actionLabel: "Accept",
  },
  {
    id: "cm2",
    invoiceItem: "Coca-Cola 12oz Cans 12pk",
    posProduct: "Coca-Cola 12oz",
    vendor: "Hudson Beverage",
    confidence: 91,
    status: "Auto Match",
    actionLabel: "Accept",
  },
  {
    id: "cm3",
    invoiceItem: "Kettle Sea Salt 5oz",
    posProduct: "Kettle Chips Sea Salt",
    vendor: "Metro Snacks",
    confidence: 87,
    status: "Review",
    actionLabel: "Review Match",
  },
  {
    id: "cm4",
    invoiceItem: "RB Energy 24ct",
    posProduct: "Red Bull 24ct",
    vendor: "Golden Supply Co.",
    confidence: 93,
    status: "Auto Match",
    actionLabel: "Accept",
  },
  {
    id: "cm5",
    invoiceItem: "Greek Yogurt Cup Case",
    posProduct: "Greek Yogurt Cup",
    vendor: "Fresh Dairy Co.",
    confidence: 82,
    status: "Review",
    actionLabel: "Review Match",
  },
];
