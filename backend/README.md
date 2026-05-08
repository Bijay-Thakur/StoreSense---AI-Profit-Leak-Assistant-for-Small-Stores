# StoreSense Backend (Flask)

## Setup

```bash
python -m venv .venv
.\.venv\Scripts\activate          # Windows
pip install -r requirements.txt
python app.py
```

Server runs at `http://localhost:5000`.

The frontend calls this API either directly (`BACKEND_URL` from server rendering) or through the Next.js proxy at `/api/proxy/*`.

## JSON API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Service check |
| GET | `/api/dashboard` | Home KPI + AI cards + charts data |
| GET | `/api/products` | All products (`image` paths match frontend `/public`) |
| GET | `/api/products/milk-gallon` | Milk insight + cost trend |
| GET | `/api/insights/reorder-plan` | Reorder plan buckets + summary |
| GET | `/api/alerts` | Profit/stock alerts (with resolved images) |
| GET | `/api/invoice/preview` | Simulated OCR line items |
| POST | `/api/invoice/import` | Simulated import acknowledgment |
