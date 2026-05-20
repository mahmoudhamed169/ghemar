"use client";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DriverStatus } from "@/shared/lib/types/drivers/driver";
import { useUpdateDriverStatus } from "@/shared/lib/hooks/drivers/use-update-driver-status";

const STATUS_COLORS: Record<DriverStatus, string> = {
  active: "text-[#00C950]",
  suspended: "text-[#DC2626]",
  deactivated: "text-[#6B7280]",
};

const ALL_STATUSES: DriverStatus[] = ["active", "suspended", "deactivated"];

export default function DriverStatusToggle({
  currentStatus,
  driverId,
}: {
  currentStatus: DriverStatus;
  driverId: string;
}) {
  const t = useTranslations("drivers.status");
  const { mutate: updateStatus, isPending } = useUpdateDriverStatus();

  const handleChange = (newStatus: DriverStatus) => {
    if (newStatus === currentStatus) return;
    updateStatus({ driverId, status: newStatus });
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-fit border-none shadow-none focus:ring-0 flex-row-reverse gap-1 hover:cursor-pointer disabled:opacity-50">
        <SelectValue>
          <span
            className={`text-sm font-medium ${STATUS_COLORS[currentStatus]}`}
          >
            {t(currentStatus)}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="min-w-[180px] p-2">
        {ALL_STATUSES.map((status) => (
          <SelectItem
            key={status}
            value={status}
            className="text-base py-3 px-4 cursor-pointer"
          >
            <span className={`font-medium ${STATUS_COLORS[status]}`}>
              {t(status)}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
