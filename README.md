# StoreSense

**POS-connected reorder, invoice, and profit-leak assistant for small stores**

## Overview

Small store owners often reorder and price by habit, not evidence. Vendor costs can rise line by line while retail prices stay flat. Slow sellers sit on shelves, and there is rarely time to dig through spreadsheets to see which SKUs actually earn money.

**StoreSense** is a focused assistant for that reality. It treats invoice, inventory, margin, and demand signals as inputs and returns **plain-language actions**: what to reorder, what to skip, and when a price change may be warranted after a supplier increase.

The current codebase is a **hackathon-ready MVP**: a polished **mobile-first** Next.js app with **typed mock data** (CSV + small TypeScript fixtures). There is **no production AI**, **no live POS**, and **no real payments**—only realistic UX and copy so judges and store owners can see the product vision clearly.

## Problem

- **No in-house analyst.** Many neighborhood stores cannot afford dedicated analytics or enterprise BI.
- **Reorder by gut.** Stock decisions are often disconnected from margin, days on hand, and real demand.
- **Silent margin erosion.** Vendor price increases are easy to miss until profit has already slipped.
- **Cash and shelf tied up** in low-turnover or weak-margin products that do not earn their space.
- **Reports without direction.** Generic dashboards show numbers but do not tell the owner **what to do next**.

## Solution

StoreSense is built as a **decision-support product**, not a generic “business dashboard.” It frames the day around POS-driven sales health, stock risk, invoice due dates, and clear reorder/price actions.

The MVP also presents a **credible SaaS shape**: **Free vs Pro (preview)** positioning, a **Profile / Settings** area, and **Pro-only** screens for **market price benchmarking** and **analyst consultation**—all driven by **frontend-only** state and **demo data**.

### What the app does today

- **Free plan (default)** — Operations: home KPIs, POS activity, reorder plan, product insight, invoices, alerts, and profit-leak style narratives over mock data.
- **Pro plan (demo preview)** — Toggle in Profile (persisted in `localStorage` as `storesense_plan`). Unlocks **Market Price Benchmark** (`/market`): top-SKU comparison vs **illustrative** nearby averages, simple bar comparison, and a **Talk to a Business Analyst** card (scheduling is a “coming soon” stub—no calendar, no chat backend).
- **Profile** (`/profile`) — Store card (Sam’s Market demo), plan selection, settings rows (local toggles), and Pro upsells.
- **Demo login** — `admin` / `admin` sets an auth cookie; **full page refresh** clears that cookie and sends you back to login so pitches can start from a clean sign-in.

Core operational demo data is loaded from **CSV** files in `frontend/public/mock-data` via `frontend/src/data` loaders. **Store profile** and **market benchmark** fixtures live in `frontend/src/data/storeProfile.ts` and `frontend/src/data/marketBenchmarks.ts`.

## Key Features

### Home Dashboard

Today’s sales/profit KPIs, low-stock and unpaid-invoice callouts, **AI-style action cards**, a **daily sales trend (Mon–Sat)**, and **plan-aware** UI: **Free Plan** / **Pro Plan** badge plus either an **Unlock Market Price Benchmark** card or a **Market Price Opportunity** shortcut to `/market`.

### POS Activity

Mock POS lines drive transactions, top sold items, and hourly sales bars—framed as “synced” for the demo.

### Products / Reorder Plan

Estimated spend, reorder vs **do not reorder** lists, strategy copy, product list, link to **Milk Gallon** insight, and a row linking to **Market Price Benchmark** (`/market`; Pro content or upgrade gate).

### Market Price Benchmark (Pro preview)

**Route:** `/market`. Summary tiles (items compared, illustrative avg gap, opportunities, market area), **Top 5** benchmark cards with suggested actions, a **your price vs nearby average** bar comparison (CSS-based—no charting library), and a **Market insight** callout. All numbers are **labeled as demo / simulated**.

### Profile & Settings

**Route:** `/profile`. Store profile fields, **current plan** card, side-by-side **Free** and **Pro** plan cards (**Preview Pro** enables Pro without any checkout), settings rows, and **Talk to a Business Analyst** when Pro is selected.

### Product Insights

**`/products/milk-gallon`** — Sell price, vendor cost, margin language, units, days on hand, cost trend, and recommended actions.

### Invoices

Paid / unpaid / due soon / overdue summaries and filter tabs.

### Alerts

Prioritized issues with filter pills and suggested actions.

### Navigation & header

Bottom nav for main tabs; **SM** avatar in the header opens **Profile** on every screen that uses the shared header actions.

## MVP Screens

Routes in the **Next.js App Router** under `frontend/app/`:

| Route | Purpose |
|--------|---------|
| `/login` | Demo login (`admin` / `admin`) |
| `/` | Home dashboard |
| `/home` | Same as home (re-export) |
| `/sales` | POS activity |
| `/products` | Reorder plan + product list |
| `/products/milk-gallon` | Product insight (example SKU) |
| `/invoices` | Vendor invoices |
| `/alerts` | Alerts |
| `/profile` | Store profile, plan (Free/Pro), settings, analyst (Pro) |
| `/market` | Market Price Benchmark (gated on Free; full view on Pro preview) |

### Demo login

- **Username:** `admin`  
- **Password:** `admin`

## Demo Workflow

1. Sign in and land on **Home** — KPIs, actions, plan badge, and (on Free) the benchmark upsell.
2. Open **Sales** for POS-style activity and hourly demand.
3. Use **Products** for reorder guidance; tap **Market Price Benchmark** or upgrade from **Profile**.
4. Open **Profile** — review store card, switch **Preview Pro Plan**, then open **Market** for benchmark cards and analyst CTA.
5. Open **Milk Gallon** insight for margin / cost narrative.
6. Check **Invoices** and **Alerts** for operational follow-ups.
7. Use header **SM** anytime to return to **Profile**.

## Plan state (technical)

- **Type:** `free` \| `pro` (default: `free`).
- **Persistence:** `localStorage` key `storesense_plan`, synced via `useSyncExternalStore` in `frontend/app/components/plan-provider.tsx` and helpers in `frontend/src/lib/plan.ts`.
- **No Stripe, no billing API, no checkout**—Pro is explicitly a **demo preview**.

## Tech Stack

From **`frontend/package.json`**:

| Layer | Technologies |
|--------|----------------|
| **Frontend** | [Next.js](https://nextjs.org/) **16** (App Router), [React](https://react.dev/) **19**, [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) **4**, [Lucide React](https://lucide.dev/) |
| **Data** | CSV in `frontend/public/mock-data` + typed loaders/helpers in `frontend/src/data`; benchmark + store fixtures in `frontend/src/data/*.ts` |
| **Auth (demo)** | Cookie `storesense_auth` via `frontend/app/api/auth/login/route.ts` + `frontend/middleware.ts` |

**Not in this repo:** Supabase, Firebase, Stripe, live competitor APIs, real Gmail/OCR, production POS connectors, or hosted LLM calls. Benchmark charts use **simple CSS bars**, not Recharts.

## Mock Data Notice

**All catalog entries, sales, invoices, trends, recommendations, alerts, store profile fields, and market benchmark figures are simulated.** They exist to show UX and copy, not live retail truth.

The UI is **intentionally built** to show how StoreSense would behave once wired to real POS, invoices, accounts, and (for Pro) vetted external price signals.

## Future Improvements

- **Real POS and inventory integrations** with scheduled sync.
- **Invoice ingestion** (OCR, EDI, or supplier portals).
- **Authenticated multi-tenant accounts**, roles, and audit logs.
- **Real competitive / market price feeds** with clear data provenance (replacing demo benchmarks).
- **Actual Pro billing** (Stripe or similar) and feature flags.
- **Durable SKU and vendor cost history** with full analytics.
- **Demand forecasting** beyond static demo labels.
- **Exports** (PDF/CSV) and **PWA** for counter devices.

## Business Value

StoreSense targets the **few decisions that move the needle weekly**: reorder quantity, shelf mix, and whether list prices still cover creeping supplier costs. **Free** keeps the owner grounded in operations; **Pro** (in product vision) adds **market context** and optional **human analyst** help—packaged as specific actions, not opaque charts.

---

## Getting Started

The app lives in **`frontend/`** (Next.js).

### Prerequisites

- **Node.js** (LTS recommended) and npm

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:3000`**.

`npm run dev` uses **Webpack** (not Turbopack) with a raised Node heap (`NODE_OPTIONS` via **`cross-env`**) for stability on constrained machines. Optional: **`npm run dev:turbo`** for Turbopack locally.

No environment variables are required for this mock-data MVP.

### Production build (frontend)

```bash
cd frontend
npm install
npm run build
npm start
```

### Lint (frontend)

```bash
cd frontend
npm run lint
```

---

*StoreSense — profit leaks, reorders, and pricing signals for stores that cannot afford enterprise retail software.*
