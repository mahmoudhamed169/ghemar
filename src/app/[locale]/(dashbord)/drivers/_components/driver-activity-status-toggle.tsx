"use client";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DriverActivityStatus } from "@/shared/lib/types/drivers/driver";

const STATUS_COLORS: Record<DriverActivityStatus, string> = {
  available: "text-[#00C950]",
  in_order: "text-[#0C6175]",
  offline: "text-[#6B7280]",
};

const ALL_STATUSES: DriverActivityStatus[] = [
  "available",
  "in_order",
  "offline",
];

export default function DriverActivityStatusToggle({
  currentStatus,
  driverId,
}: {
  currentStatus?: DriverActivityStatus;
  driverId: string;
}) {
  const t = useTranslations("drivers.activity_status");

  const handleChange = async (newStatus: DriverActivityStatus) => {
    if (newStatus === currentStatus) return;
    // TODO: call API
    console.log(`Update driver ${driverId} activityStatus to ${newStatus}`);
  };

  return (
    <Select value={currentStatus ?? ""} onValueChange={handleChange}>
      <SelectTrigger className="w-fit border-none shadow-none focus:ring-0 flex-row-reverse gap-1 hover:cursor-pointer">
        <SelectValue>
          <span
            className={`text-sm font-medium ${currentStatus ? STATUS_COLORS[currentStatus] : "text-gray-400"}`}
          >
            {currentStatus ? t(currentStatus) : "—"}
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
