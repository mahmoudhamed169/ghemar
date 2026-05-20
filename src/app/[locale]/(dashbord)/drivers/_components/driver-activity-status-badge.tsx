"use client";
import { useTranslations } from "next-intl";
import { DriverActivityStatus } from "@/shared/lib/types/drivers/driver";

const STATUS_STYLES: Record<
  DriverActivityStatus,
  { dot: string; text: string; border: string; bg: string }
> = {
  available: {
    dot: "bg-[#00C950]",
    text: "text-[#00C950]",
    border: "border-[#00C950]",
    bg: "bg-[#F0FDF4]",
  },
  in_order: {
    dot: "bg-[#0C6175]",
    text: "text-[#0C6175]",
    border: "border-[#0C6175]",
    bg: "bg-[#0069800D]",
  },
  offline: {
    dot: "bg-[#6B7280]",
    text: "text-[#6B7280]",
    border: "border-[#6B7280]",
    bg: "bg-[#F3F4F6]",
  },
};

export default function DriverActivityStatusBadge({
  status,
}: {
  status?: DriverActivityStatus;
}) {
  const t = useTranslations("drivers.activity_status");
  if (!status) return <span className="text-gray-400 text-sm">—</span>;
  const styles = STATUS_STYLES[status];

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${styles.border} ${styles.bg}`}
    >
      <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
      <span className={`text-sm font-medium ${styles.text}`}>{t(status)}</span>
    </div>
  );
}
