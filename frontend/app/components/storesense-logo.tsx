import Image from "next/image";

type BrandSize = "sm" | "md" | "lg" | "splash";

const markSizes: Record<BrandSize, number> = {
  sm: 36,
  md: 44,
  lg: 52,
  splash: 80,
};

const textSizes: Record<BrandSize, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl sm:text-[28px]",
  splash: "text-2xl sm:text-3xl",
};

/** Cropped store icon from Logo.png (icon portion centered in frame). */
export function StoreSenseMark({
  size = "md",
  className = "",
  priority = false,
}: {
  size?: BrandSize;
  className?: string;
  priority?: boolean;
}) {
  const px = markSizes[size];

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E5E7EB]/80 bg-white shadow-sm ${className}`}
      style={{ width: px, height: px }}
    >
      <Image
        src="/Logo.png"
        alt="Store Sense"
        width={480}
        height={160}
        priority={priority}
        className="h-[118%] w-[290%] max-w-none object-contain"
        style={{ objectPosition: "18% 50%" }}
      />
    </div>
  );
}

export function StoreSenseWordmark({
  size = "md",
  className = "",
  centered = false,
}: {
  size?: BrandSize;
  className?: string;
  centered?: boolean;
}) {
  return (
    <span
      className={`font-bold leading-none tracking-tight ${textSizes[size]} ${centered ? "text-center" : ""} ${className}`}
    >
      <span className="text-[#1A73E8]">Store</span>
      <span className="text-[#FF6600]"> Sense</span>
    </span>
  );
}

/** Icon mark beside “Store Sense” wordmark. */
export function StoreSenseBrand({
  size = "md",
  className = "",
  priority = false,
  showTagline = false,
  centered = false,
}: {
  size?: BrandSize;
  className?: string;
  priority?: boolean;
  showTagline?: boolean;
  centered?: boolean;
}) {
  const layout = centered
    ? "flex-col items-center justify-center text-center"
    : "flex-row items-center";

  return (
    <div className={`flex gap-2.5 sm:gap-3 ${layout} ${className}`}>
      <StoreSenseMark size={size} priority={priority} />
      <div className={centered ? "flex flex-col items-center" : "min-w-0"}>
        <StoreSenseWordmark size={size} centered={centered} />
        {showTagline ? (
          <p className={`mt-1 text-[11px] font-medium text-[#6B7280] sm:text-xs ${centered ? "text-center" : ""}`}>
            AI Profit Leak Assistant
          </p>
        ) : null}
      </div>
    </div>
  );
}
