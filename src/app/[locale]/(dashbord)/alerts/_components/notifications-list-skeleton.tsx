export default function NotificationsListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
        <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm flex items-start gap-4"
        >
          <div className="w-10 h-10 shrink-0 rounded-xl bg-gray-100 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between gap-2">
              <div className="space-y-1.5">
                <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-28 bg-gray-100 rounded animate-pulse" />
              </div>
              <div className="h-6 w-14 bg-gray-100 rounded-full animate-pulse" />
            </div>
            <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
            <div className="flex justify-between pt-1">
              <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
