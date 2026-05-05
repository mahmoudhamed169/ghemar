type DriverStatus = "متاح" | "في المغسلة" | "قيد التوصيل";

const statusStyles: Record<
  DriverStatus,
  { dot: string; text: string; border: string; bg: string }
> = {
  متاح: {
    dot: "bg-[#00C950]",
    text: "text-[#00C950]",
    border: "border-[#00C950]",
    bg: "bg-[#F0FDF4]",
  },
  "في المغسلة": {
    dot: "bg-[#0C6175]",
    text: "text-[#0C6175]",
    border: "border-[#0C6175]",
    bg: "bg-[#0069800D]",
  },
  "قيد التوصيل": {
    dot: "bg-[#B45309]",
    text: "text-[#B45309]",
    border: "border-[#B45309]",
    bg: "bg-[#FFFBEB]",
  },
};

export default function DriverStatusBadge({ status }: { status: DriverStatus }) {
  const styles = statusStyles[status];
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${styles.border} ${styles.bg}`}>
      <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
      <span className={`text-sm font-medium ${styles.text}`}>{status}</span>
    </div>
  );
}