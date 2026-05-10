// zone-status-badge.tsx

type ZoneStatus = "نشط" | "معطل";

const statusStyles: Record<ZoneStatus, { wrapper: string; dot: string }> = {
  نشط: {
    wrapper: "border border-green-500 text-green-500",
    dot: "bg-green-500",
  },
  معطل: {
    wrapper: "border border-red-500 text-red-500",
    dot: "bg-red-500",
  },
};

export default function ZoneStatusBadge({ status }: { status: ZoneStatus }) {
  const styles = statusStyles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${styles.wrapper}`}
    >
      <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      {status}
    </span>
  );
}