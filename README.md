# StoreSense

**AI Profit Leak & Reorder Assistant for Small Stores**

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

StoreSense is built as a **decision-support product**, not a generic “business dashboard.” It frames the day around profit health, stock risk, and reorder choices.

The **MVP** demonstrates end-to-end UX and a working **frontend + backend split**:

- Daily **profit and sales** summary with recommended **action cards**
- **Simulated invoice** flow (preview line items and a one-click “import” acknowledgement)
- **Product** list with margin and status, plus a **product insight** example (Milk Gallon) with cost trend and narrative copy
- **AI Reorder Plan** view with recommended reorders vs “do not reorder”
- **Alerts** for profit leaks, low stock, weak margins, and turnover

Business logic and demo data are served from a **Flask API**; the **Next.js** app consumes that API for server-rendered screens and for browser calls via a built-in **proxy route** (see [Tech Stack](#tech-stack)).

## Key Features

### Home Dashboard

Shows today’s sales and estimated profit deltas, low-stock and profit-leak callouts, AI-style action cards (reorder, repricing, skip reorder), weekly sales trend visualization, and top profitable products—all driven by **`GET /api/dashboard`** when the backend is running.

### Scan Invoice

Simulates capturing a vendor receipt: **invoice preview** (vendor, line items, totals) from **`GET /api/invoice/preview`**, plus **`POST /api/invoice/import`** to acknowledge import. There is **no camera, OCR, or external document API** in this MVP.

### AI Reorder Plan

**Insights** screen summarizes estimated spend and revenue impact, lists products to reorder with stock and demand hints, separates “do not reorder” SKUs, and includes a weekly strategy narrative—powered by **`GET /api/insights/reorder-plan`**. Recommendations are **rule-/template-style** demo content, not a live ML model.

### Profit Leak Detection

Surfaces products and alerts where margins or supplier costs imply risk (for example Milk Gallon on the insight and alerts flows). Implemented as structured mock narratives and KPIs over static data.

### Product Insights

**Product Insight** (`/products/milk-gallon`): sell price, vendor cost, margin change language, weekly units, days on hand, cost trend visualization, AI analysis copy, and recommended actions—via **`GET /api/products/milk-gallon`** (detail) and **`GET /api/products`** (list).

### Alerts

**Alerts** (`/alerts`) lists prioritized issues with suggested actions (**`GET /api/alerts`**), aligned with the same product catalog used elsewhere.

## MVP Screens

These routes exist in the **Next.js App Router** under `frontend/app/`:

| Route | Purpose |
|--------|---------|
| `/` | Home dashboard |
| `/home` | Same as Home (alias) |
| `/scan` | Scan Invoice (preview + import) |
| `/products` | Products list with search/filter (client-side over API data) |
| `/products/milk-gallon` | Product insight detail (example SKU) |
| `/insights` | AI Reorder Plan |
| `/alerts` | Alerts |

Internal **API bridge**: `frontend/app/api/proxy/[...path]/route.ts` forwards browser requests from `/api/proxy/*` to the Flask **`/api/*`** endpoints.

## Demo Workflow

1. **Start the backend**, then **start the frontend** so all screens load live JSON (see [Getting Started](#getting-started)).
2. The **owner opens StoreSense** and sees today’s KPIs, AI action cards, and trend/product snippets on **Home**.
3. On **Scan Invoice**, they review a **simulated Golden Supply invoice** and tap **Import to Inventory**—the server returns a success response; no database or OCR runs.
4. **Products** and **Insights** reflect the same canned catalog (margins, demand labels, reorder hints).
5. **Product Insight** (Milk Gallon) and **Alerts** highlight a **profit leak** narrative (vendor cost vs price) with concrete suggested moves (e.g., raise price, limit reorder quantity).
6. Taken together, the flow shows **how the product would close the loop**: invoice → assumed cost updates → margin and stock signals → prioritized actions—in a form ready to swap for real integrations later.

## Tech Stack

Verified from **`frontend/package.json`** and **`backend/requirements.txt`**:

| Layer | Technologies |
|--------|----------------|
| **Frontend** | [Next.js](https://nextjs.org/) **16** (App Router), [React](https://react.dev/) **19**, [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) **4**, [Lucide React](https://lucide.dev/) (icons) |
| **Backend** | [Python](https://www.python.org/) **3**, [Flask](https://flask.palletsprojects.com/) **3.x**, `flask-cors` |

**Not used in this repository (do not assume):** Recharts (removed), Firebase, Supabase, OpenAI/LLM APIs, cloud OCR, real POS connectors, authentication services, or production databases.

## Mock Data Notice

**All product catalog entries, sales figures, invoice lines, trend series, reorder recommendations, and alert text are simulated** and authored in **`backend/app.py`** (and rendered by the frontend). Nothing in this MVP learns from live store data or calls external pricing or OCR services.

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

### Backend

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

Flask listens on **`http://127.0.0.1:5000`** by default (`app.py`). Health check: **`GET http://127.0.0.1:5000/api/health`**.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:3000`**.

`npm run dev` uses **Webpack** (not Turbopack) with a raised Node heap (`NODE_OPTIONS` via **`cross-env`**) so the dev server stays stable on constrained machines and avoids scanning a mistaken parent-folder workspace (e.g. a lockfile higher up under your user profile). Optional: **`npm run dev:turbo`** for Turbopack if you prefer it locally.

Optional: copy **`frontend/.env.example`** to **`frontend/.env.local`** and set **`BACKEND_URL`** if Flask runs on a non-default host or port.

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
