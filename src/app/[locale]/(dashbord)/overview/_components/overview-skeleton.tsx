const cardStyle = {
  borderRadius: "12px",
  padding: "21px",
  border: "0.67px solid #0000001F",
};

function Block({ className }: { className: string }) {
  return <div className={`bg-gray-100 rounded animate-pulse ${className}`} />;
}

function ChartSkeleton({ height }: { height: string }) {
  return (
    <div className="bg-white flex flex-col gap-4 h-full" style={cardStyle}>
      <Block className="h-5 w-40" />
      <Block className="h-3 w-24" />
      <Block className={`w-full ${height}`} />
    </div>
  );
}

export default function OverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white flex flex-col gap-3 h-[166px]" style={cardStyle}>
            <div className="flex items-start justify-between">
              <Block className="w-10 h-10 rounded-xl" />
              <Block className="h-6 w-14 rounded-lg" />
            </div>
            <Block className="h-7 w-24" />
            <Block className="h-4 w-32" />
          </div>
        ))}
      </div>

      <div className="bg-white grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4" style={cardStyle}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Block className="h-3 w-20" />
            <Block className="h-4 w-14" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartSkeleton height="h-[300px]" />
        </div>
        <ChartSkeleton height="h-[300px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartSkeleton height="h-[240px]" />
        </div>
        <ChartSkeleton height="h-[240px]" />
      </div>
    </div>
  );
}
