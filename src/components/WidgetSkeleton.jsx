export function WidgetSkeleton() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded bg-[#2d3748] animate-pulse flex-shrink-0" />
      <div className="flex flex-col gap-2">
        <div className="h-2.5 w-32 rounded bg-[#2d3748] animate-pulse" />
        <div className="h-3.5 w-44 rounded bg-[#2d3748] animate-pulse" />
      </div>
    </div>
  );
}
