# StoreSense — QA Smoke Test Checklist

Use after local changes or Vercel deploy.

## General

- [ ] App loads on Home (`/`)  
- [ ] Bottom navigation works (all 6 tabs)  
- [ ] Header profile / SM link opens Profile  
- [ ] No horizontal scroll on page body (360px width)  
- [ ] Icons render (Lucide)  
- [ ] No critical console errors on main flows  

## Pages

| Route | Check |
|-------|--------|
| `/` | KPIs, top actions, sales trend chart, Operations Hub |
| `/sales` | Transactions, top items, hourly chart |
| `/actions` | Summary cards, filters, action cards |
| `/products` | Reorder lists, product rows |
| `/products/milk-gallon` | Margin, cost trend bars |
| `/invoices` | Summary, cost-match CTA, vendor links |
| `/alerts` | Filters, take-action links |
| `/profile` | Plan toggle, Advanced Tools |
| `/market` | Pro gate or benchmark (after Pro preview) |
| `/ai-insights` | Modes, suggested questions, Ask button |
| `/assistant` | Language tabs (if tested) |
| `/import-pos` | Upload mock flow |
| `/cost-match` | Match rows, Accept/Review |
| `/vendors` | Vendor cards |
| `/vendors/fresh-dairy` | Full scorecard |
| `/weekly-brief` | Sections + export toast |
| `/pilot` | Form submit shows demo message |
| `/login` | `admin` / `admin` |

## Mobile widths

- [ ] 360px — nav labels visible, no overflow  
- [ ] 390px — cards stack, readable text  
- [ ] 430px — grids readable  

## Desktop widths

- [ ] 1024px — centered layout, multi-column grids  
- [ ] 1440px — no excessive stretch  

## Charts

- [ ] Home daily sales trend — full width, labels under points  
- [ ] Sales hourly — scroll or fit on tablet+  
- [ ] Milk cost trend — bars scale  
- [ ] Market price bars — full width rows  

## Deployment

- [ ] `npm run build` passes locally  
- [ ] Vercel deploy succeeds  
- [ ] Production URL works on phone browser  
- [ ] Demo login on production  

## Auth note (demo)

Full **page refresh** on a protected route may redirect to `/login` by design. Use in-app navigation during demos after signing in.
