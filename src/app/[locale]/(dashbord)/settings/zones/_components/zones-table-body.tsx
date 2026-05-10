// zones-table-body.tsx

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import ZoneStatusBadge from "./zone-status-badge";
import ZoneActions from "./zone-actions";

type ZoneStatus = "نشط" | "معطل";

async function getZones() {
  const statuses: ZoneStatus[] = ["نشط", "نشط", "نشط", "نشط", "معطل", "معطل"];

  return Array.from({ length: 6 }, (_, i) => ({
    id: 88200 + i,
    serial: i + 1,
    name: "منطقة الرياض الشمالية",
    drivers: Math.floor(Math.random() * 10) + 1,
    orders: Math.floor(Math.random() * 50) + 5,
    createdAt: "2024-01-15",
    status: statuses[i],
    active: i < 4,
  }));
}

export default async function ZonesTableBody() {
  const zones = await getZones();

  return (
    <TableBody>
      {zones.map((zone) => (
        <TableRow
          key={zone.serial}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {zone.serial}
          </TableCell>
          <TableCell className="text-center font-medium">{zone.id}</TableCell>
          <TableCell className="text-center font-medium">{zone.name}</TableCell>
          <TableCell className="text-center">{zone.drivers}</TableCell>
          <TableCell className="text-center">{zone.orders}</TableCell>
          <TableCell className="text-center text-sm text-gray-500">
            {zone.createdAt}
          </TableCell>
          <TableCell className="text-center">
            <ZoneStatusBadge status={zone.status} />
          </TableCell>
          <TableCell className="text-center">
            <Switch defaultChecked={zone.active} />
          </TableCell>
          <TableCell className="text-center">
            <ZoneActions zone={zone.name} zoneId={zone.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
