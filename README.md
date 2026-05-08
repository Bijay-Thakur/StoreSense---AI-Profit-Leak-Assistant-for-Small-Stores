# StoreSense

**POS-Connected Reorder, Invoice, and Profit-Leak Assistant for Small Stores**

## Overview

Small store owners often reorder and price by habit, not evidence. Vendor costs can rise line by line while retail prices stay flat. Slow sellers sit on shelves, and there is rarely time to dig through spreadsheets to see which SKUs actually earn money.

**StoreSense** is a focused assistant for that reality. It treats invoice, inventory, margin, and demand signals as inputs and returns **plain-language actions**: what to reorder, what to skip, and when a price change may be warranted after a supplier increase. The MVP is optimized for a **convincing hackathon demo**: a polished mobile-first UI backed by a small JSON API, with no claim of production AI or live retail integrations.

## Problem

- **No in-house analyst.** Many neighborhood stores cannot afford dedicated analytics or enterprise BI.
- **Reorder by gut.** Stock decisions are often disconnected from margin, days on hand, and real demand.
- **Silent margin erosion.** Vendor price increases are easy to miss until profit has already slipped.
- **Cash and shelf tied up** in low-turnover or weak-margin products that do not earn their space.
- **Reports without direction.** Generic dashboards show numbers but do not tell the owner **what to do next**.

## Solution

StoreSense is built as a **decision-support product**, not a generic “business dashboard.” It frames the day around POS-driven sales health, stock risk, invoice due dates, and clear reorder/price actions.

The **MVP** demonstrates end-to-end UX with a polished mobile-first frontend and typed mock-data layer:

- Daily **profit and sales** summary with recommended **action cards**
- **POS Activity** page showing transactions, top sold items, and hourly sales chart
- **Products/Reorder Plan** page with “reorder” and “do not reorder” actions
- **Product insight** detail (Milk Gallon) with vendor cost trend and price action
- **Invoices** page with paid/unpaid/due/overdue tracking
- **Alerts** page for priority issues and suggested actions
- **Simple login flow** for demo access (`admin` / `admin`)

Core demo data is loaded from CSV files in `frontend/public/mock-data` through a lightweight typed utility in `frontend/src/data`.

## Key Features

### Home Dashboard

Shows today’s sales/profit KPIs, low-stock and unpaid-invoice callouts, AI action cards, and a **premium daily sales line trend (Mon-Sat)** with y-axis sales labels for easier comparison.

### POS Activity

Shows live-style synced sales from mock POS lines: color-coded recent transactions, top items sold, and polished hourly sales bars.

### Products / Reorder Plan

Summarizes estimated spend and revenue impact, lists products to reorder, separates “do not reorder” SKUs, and includes strategy guidance.

### Profit Leak Detection

Surfaces products and alerts where margins or supplier costs imply risk (for example Milk Gallon on the insight and alerts flows). Implemented as structured mock narratives and KPIs over static data.

### Product Insights

**Product Insight** (`/products/milk-gallon`): sell price, vendor cost, margin change language, weekly units, days on hand, cost trend visualization, AI analysis copy, and recommended actions—via **`GET /api/products/milk-gallon`** (detail) and **`GET /api/products`** (list).

### Invoices

Tracks paid, unpaid, due soon, and overdue vendor bills with summary KPI cards and filter tabs.

### Alerts

Lists prioritized issues (profit leak, low stock, invoice due, low turnover, weak margin, resolved) with filter pills and suggested actions.

## MVP Screens

These routes exist in the **Next.js App Router** under `frontend/app/`:

| Route | Purpose |
|--------|---------|
| `/login` | Demo login page (`admin` / `admin`) |
| `/` | Home dashboard |
| `/home` | Same as Home (alias) |
| `/sales` | POS activity dashboard |
| `/products` | Reorder plan + product list |
| `/products/milk-gallon` | Product insight detail (example SKU) |
| `/invoices` | Vendor invoice tracker |
| `/alerts` | Alerts |

Legacy MVP routes (`/scan`, `/insights`) still exist but are secondary to the updated product flow above.

### Demo Login

- Username: `admin`
- Password: `admin`

## Demo Workflow

1. Owner opens **Home** and sees KPIs + action cards.
2. Opens **Sales** to review POS transactions, hourly demand, and top sellers.
3. Uses **Products** to follow reorder/do-not-reorder recommendations.
4. Opens **Milk Gallon insight** to understand vendor cost increase and pricing action.
5. Reviews **Invoices** for due soon/overdue vendor bills.
6. Uses **Alerts** to prioritize actions with clear business language.

## Tech Stack

Verified from **`frontend/package.json`** and **`backend/requirements.txt`**:

| Layer | Technologies |
|--------|----------------|
| **Frontend** | [Next.js](https://nextjs.org/) **16** (App Router), [React](https://react.dev/) **19**, [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) **4**, [Lucide React](https://lucide.dev/) |
| **Data Layer** | CSV files in `frontend/public/mock-data` + typed loaders/helpers in `frontend/src/data` |
| **Backend (optional in MVP flow)** | [Python](https://www.python.org/) **3**, [Flask](https://flask.palletsprojects.com/) **3.x**, `flask-cors` |

**Not used in this repository (do not assume):** Recharts (removed), Firebase, Supabase, OpenAI/LLM APIs, cloud OCR, real POS connectors, authentication services, or production databases.

## Mock Data Notice

**All product catalog entries, sales figures, invoices, trends, recommendations, and alerts are simulated** and sourced from CSV files in **`frontend/public/mock-data`**. Nothing in this MVP uses live POS connectors, OCR, payment rails, or external APIs.

The UI is **intentionally built** to show how StoreSense would behave once wired to:

- Real POS sales and inventory
- Actual invoice ingestion (OCR or EDI)
- Persistent vendor cost history and user accounts

Until then, the value of the MVP is **product clarity**: owner-readable actions, plausible numbers, and a credible technical shell (Next.js + Flask + JSON API).

## Future Improvements

- **Real OCR or structured invoice ingestion** (PDF, email attachments, supplier portals).
- **POS and inventory integrations** with scheduled sync jobs.
- **Barcode / shelf scanning** for stock counts.
- **Durable inventory and vendor cost tables** with full history by SKU.
- **Demand forecasting** (time series or lightweight ML), not fixed demo labels only.
- **Price optimization helpers** bounded by elasticity and competitor context.
- **Multi-store** rollups and franchise-style reporting.
- **Authentication**, roles, and audit logs.
- **Exportable weekly summaries** (PDF/CSV/email).
- **Native or PWA** packaging for countertop devices.

## Business Value

StoreSense targets the **few decisions that move the needle weekly**: reorder quantity, SKU mix on the shelf, and whether list prices still cover creeping supplier costs. By packaging those answers as **specific actions** instead of opaque charts, it aims to save owner time, cut guesswork, and **reduce silent profit leakage**—a practical wedge for indie grocery, deli, café, and convenience operators who already run tight operations.

---

## Getting Started

Clone or open this repo. The app is split into **`frontend/`** (Next.js) and **`backend/`** (Flask).

### Prerequisites

- **Node.js** (LTS recommended) and npm  
- **Python 3** with `pip`

### Backend (optional for legacy routes)

```bash
cd backend
python -m venv .venv

# Windows
.\.venv\Scripts\activate
# macOS / Linux
# source .venv/bin/activate

pip install -r requirements.txt
python app.py
```

Flask listens on **`http://127.0.0.1:5000`** by default (`app.py`). This is optional for the updated CSV-driven core flow.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:3000`**.

`npm run dev` uses **Webpack** (not Turbopack) with a raised Node heap (`NODE_OPTIONS` via **`cross-env`**) so the dev server stays stable on constrained machines and avoids scanning a mistaken parent-folder workspace (e.g. a lockfile higher up under your user profile). Optional: **`npm run dev:turbo`** for Turbopack if you prefer it locally.

No environment variables are required for the updated CSV-driven MVP routes.

### Production build (frontend)

```bash
cd frontend
npm install
npm run build
npm start
```

The Next.js **`/api/proxy/*`** route uses **`BACKEND_URL`** (defaults to `http://127.0.0.1:5000`) when forwarding browser requests—ensure Flask is reachable from the machine hosting Next.js.

### Lint (frontend)

```bash
cd frontend
npm run lint
```

---

*StoreSense — focused on profit leaks, reorders, and pricing signals for stores that cannot afford enterprise retail software.*
