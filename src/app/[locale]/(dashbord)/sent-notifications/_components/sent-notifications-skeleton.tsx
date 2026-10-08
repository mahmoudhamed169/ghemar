export default function SentNotificationsSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-4">
      <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 h-14 border-b border-gray-100">
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-6 w-14 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-4 flex-1 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
          <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}
