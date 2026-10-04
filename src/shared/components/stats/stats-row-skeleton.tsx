import StatsRow from "./stats-row";

export default function StatsRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <StatsRow>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white flex flex-col gap-3 min-h-[166px]"
          style={{
            borderRadius: "12px",
            padding: "21px",
            border: "0.67px solid #0000001F",
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse" />
          <div className="h-7 w-20 rounded bg-gray-100 animate-pulse" />
          <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
        </div>
      ))}
    </StatsRow>
  );
}
