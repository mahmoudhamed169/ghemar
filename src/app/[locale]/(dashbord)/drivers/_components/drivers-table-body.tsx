// drivers-table-body.tsx

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import DriverStatusBadge from "./driver-status-badge";
import DriverStatusToggle from "./driver-status-toggle";
import DriverActions from "./driver-actions";

type DriverStatus = "متاح" | "في المغسلة" | "قيد التوصيل";

async function getDrivers() {
  const statuses: DriverStatus[] = [
    "متاح",
    "متاح",
    "متاح",
    "في المغسلة",
    "قيد التوصيل",
    "قيد التوصيل",
    "قيد التوصيل",
  ];

  return Array.from({ length: 7 }, (_, i) => ({
    id: 77100 + i,
    serial: i + 1,
    name: "أحمد محمد السعيد",
    phone: "+966512345678",
    status: statuses[i],
    active: i < 4,
  }));
}

export default async function DriversTableBody() {
  const drivers = await getDrivers();

  return (
    <TableBody>
      {drivers.map((driver) => (
        <TableRow
          key={driver.serial}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {driver.serial}
          </TableCell>
          <TableCell className="text-center font-medium">{driver.id}</TableCell>
          <TableCell className="text-center font-medium">
            {driver.name}
          </TableCell>
          <TableCell className="text-center" dir="ltr">
            {driver.phone}
          </TableCell>
          <TableCell className="text-center">
            <DriverStatusBadge status={driver.status} />
          </TableCell>
          <TableCell className="text-center">
            <DriverStatusToggle currentStatus={driver.status} />
          </TableCell>
          <TableCell className="text-center">
            <DriverActions driver={driver.name} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
