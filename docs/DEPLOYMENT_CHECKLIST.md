# StoreSense — Vercel Deployment Checklist

## Pre-deployment (local)

```bash
cd frontend
npm install
npm run build
npm run lint
```

- [ ] Build completes with exit code 0  
- [ ] Lint passes (if used)  
- [ ] No TypeScript errors  
- [ ] Demo login works: `admin` / `admin`  
- [ ] Spot-check routes on `http://localhost:3000`  

## Vercel project settings

| Setting | Value |
|---------|--------|
| **Root Directory** | `frontend` |
| **Framework Preset** | Next.js (auto-detected) |
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Output Directory** | (default — Next.js) |
| **Node.js Version** | 20.x (LTS) recommended |

## Environment variables

**None required** for the mock-data MVP.

- No OpenAI API key  
- No database URL  
- No Supabase / Firebase  
- No Stripe keys  

Future production integrations will require secrets in Vercel → Settings → Environment Variables.

## Deploy steps

1. Push latest code to GitHub.  
2. Import the repository in [Vercel](https://vercel.com).  
3. Set **Root Directory** to `frontend`.  
4. Confirm build command: `npm run build`.  
5. Deploy (no env vars needed).  
6. Open the production URL.  
7. Sign in with demo credentials (`admin` / `admin`).  
8. Test on **laptop** and **phone** (or browser devtools 360px / 390px / 768px).  

## Post-deploy smoke test

- [ ] `/` Home loads  
- [ ] `/sales` — charts visible, horizontal scroll only where intended  
- [ ] `/actions` — Action Center  
- [ ] `/ai-insights` — AI chat  
- [ ] `/invoices`, `/alerts`, `/profile`  
- [ ] `/products`, `/products/milk-gallon`  
- [ ] `/market` (Pro preview from Profile)  
- [ ] `/import-pos`, `/cost-match`, `/vendors`, `/weekly-brief`, `/pilot`  
- [ ] Bottom nav (6 items) fits on mobile  
- [ ] No horizontal page overflow  

## Responsive testing checklist

| Width | Device class |
|-------|----------------|
| 360px | Small phone |
| 390px | iPhone-class |
| 430px | Large phone |
| 768px | Tablet |
| 1024px | Laptop |
| 1440px | Desktop |

Check: cards stack, grids collapse, charts scale, forms full-width, CTAs tappable.

## Mock data note

Demo CSV files live in `frontend/public/mock-data/`. They must remain in the repo for Vercel builds. Server components read them at build/request time via `readFile` from `public/mock-data/`.

## Known limitations (MVP)

- Demo auth cookie only — not production security  
- Full browser refresh may return to login (middleware demo behavior)  
- Pro plan is `localStorage` preview only  
- AI responses are deterministic — no hosted LLM  
- No real POS / Gmail / OCR integrations  

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build OOM on Vercel | Build already sets `NODE_OPTIONS=--max-old-space-size=8192` via `cross-env` |
| 404 on routes | Ensure Root Directory is `frontend`, not repo root |
| CSV not found | Verify `public/mock-data/*.csv` committed |
| Login loop | Use client-side navigation after login; avoid hard refresh on protected routes during demo |
