export default function Loading() {
  return (
    <div className="space-y-4 animate-pulse" aria-hidden>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-7 w-40 rounded-xl bg-[#E5E7EB]" />
          <div className="h-4 w-56 rounded-lg bg-[#F3F4F6]" />
        </div>
        <div className="h-9 w-9 rounded-full bg-[#E5E7EB]" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-3xl border border-[#E5E7EB] bg-white" />
        ))}
      </div>
      <div className="h-44 rounded-3xl border border-[#E5E7EB] bg-white" />
      <div className="h-52 rounded-3xl border border-[#E5E7EB] bg-white" />
    </div>
  );
}
