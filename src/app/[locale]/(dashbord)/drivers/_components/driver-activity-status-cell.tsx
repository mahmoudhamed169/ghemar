"use client";
import DriverActivityStatusBadge from "./driver-activity-status-badge";
import DriverActivityStatusToggle from "./driver-activity-status-toggle";
import { DriverActivityStatus } from "@/shared/lib/types/drivers/driver";

export default function DriverActivityStatusCell({
  status,
  driverId,
}: {
  status?: DriverActivityStatus;
  driverId: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <DriverActivityStatusBadge status={status} />
      <DriverActivityStatusToggle currentStatus={status} driverId={driverId} />
    </div>
  );
}
