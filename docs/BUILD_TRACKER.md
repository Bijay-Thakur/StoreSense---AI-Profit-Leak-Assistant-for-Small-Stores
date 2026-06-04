# StoreSense Build Tracker

## AI Insights (2026-06-04)

| Task | Status |
|------|--------|
| AI Insights route (`/ai-insights`) | Done |
| AI tab in bottom navigation (6 items) | Done |
| Assistant modes (5) | Done |
| Mock AI engine (`aiInsightEngine.ts`) | Done |
| Suggested questions + chat UI | Done |
| Source badges + quick action links | Done |
| Home CTA | Done |
| Contextual AI links (actions, invoices, milk product, profile) | Done |
| Build + lint | See below |

**Bottom nav (6 items):** Home | Sales | Actions (center) | **AI** | Invoices | Alerts

**Assistant modes:** Sales Analyst, Invoice Assistant, Inventory / SKU Advisor, Pricing & Margin Analyst, Weekly Brief

**Files:** `src/data/aiInsights.ts`, `src/lib/aiInsightEngine.ts`, `app/ai-insights/`, `app/components/ai-insights-cta.tsx`

---

## IA reorganization (2026-06-04)

| Task | Status |
|------|--------|
| Bottom nav: Home \| Sales \| **Actions** \| Invoices \| Alerts | Done |
| Action Center as main decision hub (`/actions`) | Done |
| Operations Hub on Home (replaces Business Tools list) | Done |
| Contextual links (invoices, products, alerts, profile) | Done |
| Daily sales trend chart layout fix | Done |
| POS fit explanation card | Done |
| Build + lint | See below |

## Navigation

**Bottom nav (6 items):**
- Home → `/`
- Sales → `/sales`
- **Actions** (center) → `/actions`
- **AI** → `/ai-insights`
- Invoices → `/invoices`
- Alerts → `/alerts`

**Still available (not in bottom nav):**
- `/products` — full reorder plan (linked from Action Center + Operations Hub)
- Operations Hub cards: import-pos, cost-match, actions, vendors, weekly-brief, pilot
- `/market`, `/assistant`, profile Advanced Tools

## Feature checklist (prior release)

| Feature | Route | Status |
|---------|-------|--------|
| Import POS Report | `/import-pos` | Done |
| Cost Match Center | `/cost-match` | Done |
| Action Center | `/actions` | Done (main tab) |
| Vendor Scorecard | `/vendors`, `/vendors/[vendorId]` | Done |
| Weekly Owner Brief | `/weekly-brief` | Done |
| Market Benchmark | `/market` | Done |
| Owner Assistant | `/assistant` | Done |
| Pilot Access | `/pilot` | Done |

## Files changed (IA pass)

- `app/components/app-shell.tsx` — Actions center tab
- `app/page.tsx` — hierarchy, chart, Operations Hub, PosFitCard
- `app/components/operations-hub-section.tsx` — new
- `app/components/daily-sales-trend-chart.tsx` — new
- `app/components/pos-fit-card.tsx` — new
- `app/components/business-tools-section.tsx` — removed
- `app/actions/page.tsx` — Cost Match action, quick links
- `src/data/actionCenter.ts` — Cost Match type + action
- `src/data/vendorSlugs.ts` — vendor links from invoice names
- `app/invoices/invoices-client.tsx` — cost match CTA, vendor links
- `app/products/page.tsx` — market copy, link to actions
- `app/alerts/alerts-client.tsx` — contextual Take action links
- `app/components/profile-tools-section.tsx` — Advanced Tools
- `app/import-pos/page.tsx` — PosFitCard

## Vercel deployment & responsive audit (2026-06-04)

| Task | Status |
|------|--------|
| Responsive audit (360–1440px) | Done |
| Chart responsiveness fixed | Done |
| Vercel build readiness | See below |
| `.gitignore` updated (root) | Done |
| `docs/DEPLOYMENT_CHECKLIST.md` | Done |
| `docs/QA_CHECKLIST.md` | Done |
| `frontend/vercel.json` | Done |

### Responsive fixes

- `globals.css` — `overflow-x: hidden` on html/body
- `app-shell.tsx` — 6-tab nav `justify-evenly`, smaller center button, truncated labels
- `ui.tsx` — `ScreenHeader` shrink/min-width for mobile
- `page.tsx` — responsive greeting typography
- `products/page.tsx` — spend grid `grid-cols-1 sm:grid-cols-3`
- `market/page.tsx` — `sm:grid-cols-3 lg:grid-cols-5`
- `daily-sales-trend-chart.tsx` — full-width SVG, y-axis `sm:flex`, aligned labels
- `sales/page.tsx` — hourly chart scroll on mobile, no fixed 560px min on md+

### Chart fixes

- Home daily sales trend: responsive SVG width, labels under data points
- Sales hourly: `overflow-x-auto` on small screens, flexible grid columns
- Removed invalid Tailwind `xs:` breakpoint usage

### Files changed (deployment pass)

- `.gitignore` (repo root)
- `frontend/vercel.json`
- `frontend/app/globals.css`
- `frontend/app/components/app-shell.tsx`
- `frontend/app/components/ui.tsx`
- `frontend/app/components/daily-sales-trend-chart.tsx`
- `frontend/app/page.tsx`
- `frontend/app/products/page.tsx`
- `frontend/app/market/page.tsx`
- `frontend/app/sales/page.tsx`
- `docs/DEPLOYMENT_CHECKLIST.md`
- `docs/QA_CHECKLIST.md`
- `docs/BUILD_TRACKER.md`

## Build/lint status

- **Build:** Pass (`npm run build`, 2026-06-04 — Vercel deployment prep)
- **Lint:** Pass (`npm run lint`, 2026-06-04)

## Known issues

- Middleware deprecation warning (Next.js 16, pre-existing)
- Full vendor scorecard richest on Fresh Dairy; others show summary
- Chart uses demo 7-day values on Home for stable presentation layout
- No backend persistence
- Demo auth: hard refresh on protected routes may redirect to login
- Vercel **Root Directory** must be set to `frontend`

## Fixes applied

- Sales chart: full-width SVG, aligned day labels, 7-day demo data
- Action Center promoted to center bottom nav
- Operations Hub 2-column grid with badges (not plain list)
- Deployment docs + gitignore for Vercel MVP
