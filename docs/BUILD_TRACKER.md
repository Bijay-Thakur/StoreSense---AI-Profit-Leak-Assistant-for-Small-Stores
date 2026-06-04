# StoreSense Build Tracker

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

**Bottom nav (5 items):**
- Home → `/`
- Sales → `/sales`
- **Actions** (center) → `/actions` — was “Reorder Plan” → `/products`
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

## Build/lint status

- **Build:** Pass (`npm run build`, 2026-06-04)
- **Lint:** Pass (`npm run lint`, 2026-06-04)

## Known issues

- Middleware deprecation warning (Next.js 16, pre-existing)
- Full vendor scorecard richest on Fresh Dairy; others show summary
- Chart uses demo 7-day values on Home for stable presentation layout
- No backend persistence

## Fixes applied

- Sales chart: full-width SVG, aligned day labels, 7-day demo data
- Action Center promoted to center bottom nav
- Operations Hub 2-column grid with badges (not plain list)
