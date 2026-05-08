# StoreSense API Reference

**Base URL (dev):** `http://localhost:5001`  
**Frontend proxy:** Vite forwards `/api/*` → `http://localhost:5001/api/*`  
No CORS issues in development — all requests go through the Vite dev server.

---

## Endpoints

### `GET /api/health`

Simple health check.

```json
{ "status": "ok", "service": "storesense-backend" }
```

---

### `GET /api/dashboard`

All data needed for the main dashboard screen.

```ts
{
  todaySales: number;              // Today's total sales
  todaySalesDeltaPct: number;      // % change from yesterday
  estimatedProfit: number;         // Estimated profit today
  estimatedProfitDeltaPct: number; // % change from yesterday
  lowStockCount: number;           // Number of low-stock products
  profitLeaksAmount: number;       // Total dollar amount of profit leaks
  weeklySalesBars: number[];       // 7 daily values for the bar chart

  aiActions: {
    title: string;
    subtitle: string;
    image: string;                 // e.g. "/products/red-bull.svg"
    badgeText: string;
    badgeTone: "green" | "orange" | "red";
    impactText: string;
    impactPositive: boolean;
    cardTone: "green" | "orange" | "red";
  }[];

  topProfitableProducts: {
    name: string;
    category: string;
    image: string;
    marginPct: number;
  }[];
}
```

---

### `GET /api/products`

Full product list.

```ts
{
  items: {
    slug: string;                  // URL key, e.g. "milk-gallon"
    name: string;
    category: string;
    vendor: string;
    image: string;
    currentStock: string;
    recommendedReorder: string;
    demandTrend: "High" | "Medium" | "Low";
    margin: number;                // Margin percentage
    estimatedProfitImpact: number; // Can be negative
    status: string;                // See status values below

    // Only present on "Profit Leak" products
    currentSellPrice?: number;
    latestVendorCost?: number;
    previousVendorCost?: number;
    marginChange?: number;
    weeklyUnitsSold?: number;
    daysOnHand?: number;
    recommendedPrice?: number;
    expectedWeeklyProfitImpact?: number;
  }[]
}
```

**`status` values**

| Value | Meaning |
|-------|---------|
| `"High Demand"` | Fast seller, consider reordering |
| `"Reorder Soon"` | Stock getting low |
| `"Profitable"` | Healthy margin, no action needed |
| `"Profit Leak"` | Vendor cost rose but sell price unchanged |
| `"Do Not Reorder / Low Turnover"` | Slow-moving, skip reorder |
| `"Weak Margin"` | Low margin, review supplier pricing |

---

### `GET /api/products/milk-gallon`

Product detail page data, including cost trend and AI analysis.

```ts
{
  item: Product;                   // Same shape as product list item
  costTrend: {
    label: string;                 // e.g. "Week -8", "This Week"
    cost: number;
  }[];                             // 5 data points for the line chart
  aiAnalysis: string;              // AI-generated explanation
  whyThisMatters: string[];        // Bullet-point reasons to act
}
```

---

### `GET /api/alerts`

Action cards shown to the store owner.

```ts
{
  items: {
    product: string;
    image: string;
    title: string;
    message: string;
    action: string;                // Recommended action text
    tone: "red" | "orange" | "blue" | "green";
  }[]
}
```

---

### `GET /api/insights/reorder-plan`

This week's reorder recommendations.

```ts
{
  summary: {
    totalEstimatedSpend: number;
    spendDeltaPct: number;
    expectedRevenueImpact: number;
    revenueDeltaPct: number;
    priority: string;
    prioritySubtext: string;
  };
  recommendedReorders: Product[];  // Products to order this week
  doNotReorder: Product[];         // Products to skip
  strategy: string;                // AI-generated strategy summary
}
```

---

### `GET /api/invoice/preview`

```ts
{
  vendor: string;
  invoiceId: string;
  date: string;
  lines: {
    product: string;
    image: string;
    qty: number;
    unitCost: number;
    total: number;
  }[];
  total: number;
}
```

---

### `POST /api/invoice/import`

```ts
// Request body: any JSON
// Response:
{ ok: true; message: string }
```

---

## Shared Types

### `tone` / `badgeTone` / `cardTone`

| Value | Color | Use case |
|-------|-------|----------|
| `"red"` | Red | Critical warning |
| `"orange"` | Orange | Caution |
| `"green"` | Green | Healthy / positive |
| `"blue"` | Blue | Informational |

---

## Image Assets

All product images are static SVGs at `/products/<name>.svg`.  
Place them in `frontend/public/products/`.

| File | Product |
|------|---------|
| `red-bull.svg` | Red Bull 24ct |
| `coca-cola.svg` | Coca-Cola 12oz |
| `eggs.svg` | Eggs |
| `frappuccino.svg` | Starbucks Frappuccino |
| `milk.svg` | Milk Gallon |
| `kettle-chips.svg` | Kettle Chips |
| `sparkling-water.svg` | Sparkling Water Variety Pack |
| `almonds.svg` | Blue Diamond Almonds |

---

## Running Locally

```bash
# Backend (port 5001)
cd backend
python3 app.py

# Frontend (port 3000)
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` — Vite proxies `/api/*` to the Flask server automatically.
