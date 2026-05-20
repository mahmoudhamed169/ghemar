"use client";
import { useTranslations } from "next-intl";
import { DriverStatus } from "@/shared/lib/types/drivers/driver";

const STATUS_STYLES: Record<
  DriverStatus,
  { dot: string; text: string; border: string; bg: string }
> = {
  active: {
    dot: "bg-[#00C950]",
    text: "text-[#00C950]",
    border: "border-[#00C950]",
    bg: "bg-[#F0FDF4]",
  },
  suspended: {
    dot: "bg-[#DC2626]",
    text: "text-[#DC2626]",
    border: "border-[#DC2626]",
    bg: "bg-[#FEF2F2]",
  },
  deactivated: {
    dot: "bg-[#6B7280]",
    text: "text-[#6B7280]",
    border: "border-[#6B7280]",
    bg: "bg-[#F3F4F6]",
  },
};

export default function DriverStatusBadge({
  status,
}: {
  status: DriverStatus;
}) {
  const t = useTranslations("drivers.status");
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
