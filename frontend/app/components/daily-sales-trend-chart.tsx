import { formatCurrency } from "@/src/data/helpers";

export type TrendPoint = { day: string; sales: number };

/** Demo-friendly 7-day trend — padded SVG, day labels aligned to data points. */
export const defaultTrendData: TrendPoint[] = [
  { day: "Mon", sales: 2400 },
  { day: "Tue", sales: 2850 },
  { day: "Wed", sales: 3200 },
  { day: "Thu", sales: 1765 },
  { day: "Fri", sales: 3150 },
  { day: "Sat", sales: 3500 },
  { day: "Sun", sales: 4112 },
];

const PAD_X = 10;
const CHART_TOP = 6;
const CHART_BOTTOM = 36;
const LABEL_Y = 44;

function pointX(index: number, count: number): number {
  if (count <= 1) return 50;
  return PAD_X + (index / (count - 1)) * (100 - PAD_X * 2);
}

export function DailySalesTrendChart({ data = defaultTrendData }: { data?: TrendPoint[] }) {
  if (!data.length) {
    return <p className="text-sm text-[#6B7280]">No trend data found.</p>;
  }

  const n = data.length;
  const title = n === 7 ? "Daily Sales Trend — Last 7 Days" : `Daily Sales Trend — Last ${n} Days`;
  const maxSales = Math.max(...data.map((d) => d.sales), 1);
  const minSales = Math.min(...data.map((d) => d.sales));
  const range = Math.max(maxSales - minSales, 1);
  const chartHeight = CHART_BOTTOM - CHART_TOP;

  const points = data.map((d, i) => {
    const x = pointX(i, n);
    const y = CHART_TOP + (1 - (d.sales - minSales) / range) * chartHeight;
    return { ...d, x, y };
  });

  const linePath = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${CHART_BOTTOM} L ${points[0].x} ${CHART_BOTTOM} Z`;

  const yTicks = [
    { value: maxSales, y: CHART_TOP },
    { value: minSales + range * 0.5, y: CHART_TOP + chartHeight * 0.5 },
    { value: minSales, y: CHART_BOTTOM },
  ];

  return (
    <div className="w-full">
      <h2 className="text-base font-semibold text-[#111827]">{title}</h2>
      <div className="mt-4 w-full rounded-2xl bg-[#F8FAFC] p-3 md:p-4">
        <div className="flex w-full min-w-0 gap-2">
          <div className="relative hidden w-14 shrink-0 sm:block">
            {yTicks.map((tick) => (
              <span
                key={tick.value}
                className="absolute right-0 -translate-y-1/2 truncate text-[10px] font-semibold text-[#374151]"
                style={{ top: `${(tick.y / 48) * 100}%` }}
              >
                {formatCurrency(tick.value)}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <svg
              viewBox="0 0 100 48"
              className="h-36 w-full sm:h-44"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label={title}
            >
              <defs>
                <linearGradient id="homeTrendArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((step) => (
                <line
                  key={step}
                  x1={PAD_X}
                  y1={CHART_TOP + chartHeight * (1 - step)}
                  x2={100 - PAD_X}
                  y2={CHART_TOP + chartHeight * (1 - step)}
                  stroke="#E5E7EB"
                  strokeWidth="0.35"
                  strokeDasharray="2 2"
                />
              ))}
              <line x1={PAD_X} y1={CHART_BOTTOM} x2={100 - PAD_X} y2={CHART_BOTTOM} stroke="#D1D5DB" strokeWidth="0.4" />
              <path d={areaPath} fill="url(#homeTrendArea)" />
              <path
                d={linePath}
                fill="none"
                stroke="#16A34A"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((p) => (
                <circle key={p.day} cx={p.x} cy={p.y} r="2" fill="#fff" stroke="#16A34A" strokeWidth="0.9" />
              ))}
              {points.map((p) => (
                <text
                  key={`${p.day}-label`}
                  x={p.x}
                  y={LABEL_Y}
                  textAnchor="middle"
                  fill="#6B7280"
                  fontSize="3.2"
                  fontWeight="500"
                >
                  {p.day}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
