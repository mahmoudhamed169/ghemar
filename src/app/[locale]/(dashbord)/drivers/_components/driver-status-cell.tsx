"use client";
import DriverStatusBadge from "./driver-status-badge";
import DriverStatusToggle from "./driver-status-toggle";
import { DriverStatus } from "@/shared/lib/types/drivers/driver";

export default function DriverStatusCell({
  status,
  driverId,
}: {
  status: DriverStatus;
  driverId: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <DriverStatusBadge status={status} />
      <DriverStatusToggle currentStatus={status} driverId={driverId} />
    </div>
  );
}
