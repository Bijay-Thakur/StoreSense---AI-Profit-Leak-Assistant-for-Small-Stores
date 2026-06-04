import { formatCurrency } from "@/src/data/helpers";

export type TrendPoint = { day: string; sales: number };

/** Demo-friendly 7-day trend — full-width SVG, labels aligned to points. */
export const defaultTrendData: TrendPoint[] = [
  { day: "Mon", sales: 2400 },
  { day: "Tue", sales: 2850 },
  { day: "Wed", sales: 3200 },
  { day: "Thu", sales: 1765 },
  { day: "Fri", sales: 3150 },
  { day: "Sat", sales: 3500 },
  { day: "Sun", sales: 4112 },
];

export function DailySalesTrendChart({ data = defaultTrendData }: { data?: TrendPoint[] }) {
  if (!data.length) {
    return <p className="text-sm text-[#6B7280]">No trend data found.</p>;
  }

  const n = data.length;
  const title = n === 7 ? "Daily Sales Trend — Last 7 Days" : `Daily Sales Trend — Last ${n} Days`;
  const maxSales = Math.max(...data.map((d) => d.sales), 1);
  const minSales = Math.min(...data.map((d) => d.sales));
  const range = Math.max(maxSales - minSales, 1);

  const points = data.map((d, i) => {
    const x = n === 1 ? 50 : (i / (n - 1)) * 100;
    const y = 8 + (1 - (d.sales - minSales) / range) * 32;
    return { ...d, x, y };
  });

  const linePath = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} 42 L ${points[0].x} 42 Z`;

  const yTicks = [maxSales, minSales + range * 0.5, minSales];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#111827]">{title}</h2>
      </div>
      <div className="mt-4 w-full rounded-2xl bg-[#F8FAFC] p-3 md:p-4">
        <div className="flex w-full min-w-0 gap-1 sm:gap-2">
          <div className="hidden w-12 shrink-0 flex-col justify-between py-1 text-[9px] font-semibold text-[#374151] sm:flex sm:w-14 sm:text-[10px]">
            {yTicks.map((tick) => (
              <span key={tick} className="truncate">
                {formatCurrency(tick)}
              </span>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <svg viewBox="0 0 100 45" className="h-36 w-full min-w-0 sm:h-44" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="homeTrendArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((step) => (
                <line
                  key={step}
                  x1={0}
                  y1={8 + 32 * (1 - step)}
                  x2={100}
                  y2={8 + 32 * (1 - step)}
                  stroke="#E5E7EB"
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                />
              ))}
              <line x1={0} y1={42} x2={100} y2={42} stroke="#D1D5DB" strokeWidth="0.4" />
              <path d={areaPath} fill="url(#homeTrendArea)" />
              <path d={linePath} fill="none" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              {points.map((p) => (
                <circle key={p.day} cx={p.x} cy={p.y} r="1.8" fill="#fff" stroke="#16A34A" strokeWidth="0.8" />
              ))}
            </svg>
            <div
              className="mt-2 grid w-full text-center text-[11px] text-[#6B7280]"
              style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
            >
              {data.map((d) => (
                <span key={d.day}>{d.day}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
