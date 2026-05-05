"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DriverStatus = "متاح" | "في المغسلة" | "قيد التوصيل";

const statuses: DriverStatus[] = ["متاح", "في المغسلة", "قيد التوصيل"];

const statusColors: Record<DriverStatus, string> = {
  متاح: "text-[#00C950]",
  "في المغسلة": "text-[#0C6175]",
  "قيد التوصيل": "text-[#B45309]",
};

export default function DriverStatusToggle({
  currentStatus,
}: {
  currentStatus: DriverStatus;
}) {
  return (
    <div className="flex justify-center items-center w-full">
      <Select defaultValue={currentStatus}>
        <SelectTrigger className="w-fit border-none shadow-none focus:ring-0 flex-row-reverse gap-1">
          <SelectValue>
            <span className={`text-sm font-medium ${statusColors[currentStatus]}`}>
              {currentStatus}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[180px] p-2">
          {statuses.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className="text-base py-3 px-4 cursor-pointer"
            >
              <span className={`font-medium ${statusColors[status]}`}>
                {status}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}