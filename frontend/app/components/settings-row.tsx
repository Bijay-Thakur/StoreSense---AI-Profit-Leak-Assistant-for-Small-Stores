"use client";

export function SettingsRow({
  label,
  value,
  onToggle,
  active,
}: {
  label: string;
  value: string;
  onToggle?: () => void;
  active?: boolean;
}) {
  const interactive = typeof onToggle === "function";
  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onToggle}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
              }
            }
          : undefined
      }
      className={`flex items-center justify-between border-b border-[#F3F4F6] py-3 last:border-0 ${interactive ? "cursor-pointer rounded-xl px-1 hover:bg-[#F9FAFB]" : ""}`}
    >
      <span className="text-sm text-[#111827]">{label}</span>
      <span className={`text-sm font-medium ${active ? "text-[#0F8A3B]" : "text-[#6B7280]"}`}>{value}</span>
    </div>
  );
}
