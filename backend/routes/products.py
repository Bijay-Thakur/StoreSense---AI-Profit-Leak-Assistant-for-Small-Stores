from flask import Blueprint, jsonify, request

products_bp = Blueprint("products", __name__)


def _attach_images(products):
    for p in products:
        if "image" not in p:
            slug = p.get("slug")
            image_map = {
                "red-bull-24ct": "/products/red-bull.svg",
                "coca-cola-12oz": "/products/coca-cola.svg",
                "eggs": "/products/eggs.svg",
                "starbucks-frappuccino": "/products/frappuccino.svg",
                "milk-gallon": "/products/milk.svg",
                "kettle-chips": "/products/kettle-chips.svg",
                "sparkling-water-variety-pack": "/products/sparkling-water.svg",
            }
            if slug in image_map:
                p["image"] = image_map[slug]


PRODUCTS = [
    {
        "slug": "red-bull-24ct",
        "name": "Red Bull 24ct",
        "category": "Energy Drink",
        "vendor": "Golden Supply Co.",
        "currentStock": "2 cases",
        "recommendedReorder": "6 cases",
        "demandTrend": "High",
        "estimatedProfitImpact": 312,
        "margin": 42,
        "status": "High Demand",
    },
    {
        "slug": "coca-cola-12oz",
        "name": "Coca-Cola 12oz",
        "category": "Beverage",
        "vendor": "Golden Supply Co.",
        "currentStock": "1 case",
        "recommendedReorder": "5 cases",
        "demandTrend": "High",
        "estimatedProfitImpact": 256,
        "margin": 34,
        "status": "High Demand",
    },
    {
        "slug": "eggs",
        "name": "Eggs",
        "category": "Grocery",
        "vendor": "Fresh Dairy Co.",
        "currentStock": "12 cartons",
        "recommendedReorder": "20 cartons",
        "demandTrend": "Medium",
        "estimatedProfitImpact": 128,
        "margin": 28,
        "status": "Reorder Soon",
    },
    {
        "slug": "starbucks-frappuccino",
        "name": "Starbucks Frappuccino",
        "category": "Beverage",
        "vendor": "Golden Supply Co.",
        "currentStock": "3 cases",
        "recommendedReorder": "4 cases",
        "demandTrend": "High",
        "estimatedProfitImpact": 98,
        "margin": 38,
        "status": "Profitable",
    },
    {
        "slug": "milk-gallon",
        "name": "Milk Gallon",
        "category": "Dairy",
        "vendor": "Fresh Dairy Co.",
        "currentStock": "18 units",
        "recommendedReorder": "12 units",
        "demandTrend": "Medium",
        "currentSellPrice": 4.49,
        "latestVendorCost": 3.02,
        "previousVendorCost": 2.79,
        "margin": 32.7,
        "marginChange": -4.6,
        "weeklyUnitsSold": 84,
        "daysOnHand": 18,
        "status": "Profit Leak",
        "recommendedPrice": 4.99,
        "expectedWeeklyProfitImpact": 96,
        "estimatedProfitImpact": 96,
    },
    {
        "slug": "kettle-chips",
        "name": "Kettle Chips",
        "category": "Snacks",
        "vendor": "Golden Supply Co.",
        "currentStock": "45 days on hand",
        "recommendedReorder": "0",
        "demandTrend": "Low",
        "estimatedProfitImpact": -72,
        "margin": 12,
        "status": "Do Not Reorder / Low Turnover",
    },
    {
        "slug": "sparkling-water-variety-pack",
        "name": "Sparkling Water Variety Pack",
        "category": "Beverage",
        "vendor": "Golden Supply Co.",
        "currentStock": "22 packs",
        "recommendedReorder": "0",
        "demandTrend": "Low",
        "estimatedProfitImpact": -38,
        "margin": 12,
        "status": "Weak Margin",
    },
]

_attach_images(PRODUCTS)

_ALERTS_RAW = [
    {
        "product": "Milk Gallon",
        "productSlug": "milk-gallon",
        "title": "Profit Leak",
        "message": "Vendor cost increased 8.2% while price stayed the same.",
        "action": "Raise price to $4.99",
        "tone": "red",
    },
    {
        "product": "Red Bull",
        "productSlug": "red-bull-24ct",
        "title": "Low Stock",
        "message": "Only 2 cases left. High demand expected this week.",
        "action": "Reorder 6 cases",
        "tone": "orange",
    },
    {
        "product": "Kettle Chips",
        "productSlug": "kettle-chips",
        "title": "Low Turnover",
        "message": "45 days on hand with weak margin.",
        "action": "Do not reorder this week",
        "tone": "blue",
    },
    {
        "product": "Sparkling Water",
        "productSlug": "sparkling-water-variety-pack",
        "title": "Weak Margin",
        "message": "Margin is only 12%.",
        "action": "Review supplier price or skip reorder",
        "tone": "green",
    },
]

INVOICE_PREVIEW = {
    "vendor": "Golden Supply Co.",
    "invoiceId": "784512",
    "date": "May 12, 2024",
    "lines": [
        {"product": "Red Bull 24ct", "image": "/products/red-bull.svg", "qty": 2, "unitCost": 28.49, "total": 56.98},
        {"product": "Milk Gallon 1%", "image": "/products/milk.svg", "qty": 4, "unitCost": 2.49, "total": 9.96},
        {"product": "Kettle Chips Sea Salt 5oz", "image": "/products/kettle-chips.svg", "qty": 3, "unitCost": 2.79, "total": 8.37},
        {"product": "Coca-Cola 12oz Cans 12pk", "image": "/products/coca-cola.svg", "qty": 2, "unitCost": 6.49, "total": 12.98},
    ],
    "total": 95.57,
}

COST_TREND = [
    {"label": "Week -8", "cost": 2.38},
    {"label": "Week -6", "cost": 2.48},
    {"label": "Week -4", "cost": 2.61},
    {"label": "Week -2", "cost": 2.82},
    {"label": "This Week", "cost": 3.02},
]


@products_bp.get("/api/health")
def health():
    return jsonify({"status": "ok", "service": "storesense-backend"})


@products_bp.get("/api/dashboard")
def dashboard():
    return jsonify({
        "todaySales": 3842.65,
        "todaySalesDeltaPct": 12.6,
        "estimatedProfit": 1246.30,
        "estimatedProfitDeltaPct": 18.4,
        "lowStockCount": 7,
        "profitLeaksAmount": 241.75,
        "weeklySalesBars": [56, 62, 58, 70, 78, 82, 74],
        "aiActions": [
            {
                "title": "Reorder Red Bull",
                "subtitle": "Fast seller, 2 cases left",
                "image": "/products/red-bull.svg",
                "badgeText": "High demand",
                "badgeTone": "green",
                "impactText": "+$312 profit",
                "impactPositive": True,
                "cardTone": "green",
            },
            {
                "title": "Raise Milk price to $4.99",
                "subtitle": "Vendor cost increased",
                "image": "/products/milk.svg",
                "badgeText": "Price optimization",
                "badgeTone": "orange",
                "impactText": "+$96 profit/week",
                "impactPositive": True,
                "cardTone": "orange",
            },
            {
                "title": "Do not reorder Kettle Chips",
                "subtitle": "Slow-moving, low margin",
                "image": "/products/kettle-chips.svg",
                "badgeText": "Low turnover",
                "badgeTone": "red",
                "impactText": "-$72 risk",
                "impactPositive": False,
                "cardTone": "red",
            },
        ],
        "topProfitableProducts": [
            {"name": "Starbucks Frappuccino", "category": "Beverage", "image": "/products/frappuccino.svg", "marginPct": 42},
            {"name": "Blue Diamond Almonds", "category": "Snacks", "image": "/products/almonds.svg", "marginPct": 38},
            {"name": "Coca-Cola 12oz", "category": "Beverage", "image": "/products/coca-cola.svg", "marginPct": 34},
        ],
    })


@products_bp.get("/api/products")
def products():
    return jsonify({"items": PRODUCTS[:]})


@products_bp.get("/api/products/milk-gallon")
def milk_gallon():
    milk = next((p for p in PRODUCTS if p["slug"] == "milk-gallon"), None)
    return jsonify({
        "item": milk,
        "costTrend": COST_TREND,
        "aiAnalysis": "Your vendor cost has increased 8.2% while the selling price has stayed the same, reducing your margin by 4.6 percentage points.",
        "whyThisMatters": [
            "Rising costs are eating into your profits. Taking action now can recover $96 in profit every week.",
            "Maintaining the right balance between price and stock keeps customers satisfied and shelves stocked.",
        ],
    })


@products_bp.get("/api/insights/reorder-plan")
def reorder_plan():
    reorder = [p for p in PRODUCTS if p["name"] in {"Red Bull 24ct", "Coca-Cola 12oz", "Eggs", "Starbucks Frappuccino"}]
    skip = [p for p in PRODUCTS if p["name"] in {"Kettle Chips", "Sparkling Water Variety Pack"}]
    return jsonify({
        "summary": {
            "totalEstimatedSpend": 1248.50,
            "spendDeltaPct": -5.6,
            "expectedRevenueImpact": 4231,
            "revenueDeltaPct": 18.7,
            "priority": "High",
            "prioritySubtext": "Strong opportunity",
        },
        "recommendedReorders": reorder,
        "doNotReorder": skip,
        "strategy": (
            "Focus on high-demand energy drinks and seasonal beverages driving the most profit. "
            "Skip slow-moving snacks with low turnover and weak margins."
        ),
    })


@products_bp.get("/api/alerts")
def alerts():
    out = []
    for a in _ALERTS_RAW:
        slug = a["productSlug"]
        p = next((x for x in PRODUCTS if x["slug"] == slug), None)
        row = {**a, "image": (p or {}).get("image", "")}
        del row["productSlug"]
        out.append(row)
    return jsonify({"items": out})


@products_bp.get("/api/invoice/preview")
def invoice_preview():
    return jsonify(INVOICE_PREVIEW)


@products_bp.post("/api/invoice/import")
def invoice_import():
    request.get_json(silent=True)
    return jsonify({"ok": True, "message": "Invoice imported. Inventory and product costs updated."})
