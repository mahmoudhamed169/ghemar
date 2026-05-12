import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import PointsActions from "./points-actions";


async function getPoints() {
  return Array.from({ length: 7 }, (_, i) => ({
    serial: i + 1,
    id: 66788,
    name: "ماريهان رضوان",
    phone: "+966512345678",
    totalPoints: 100,
    usedPoints: 48,
    maxPoints: 100,
    remainingPoints: 52,
  }));
}

export default async function PointsTableBody() {
  const points = await getPoints();

  return (
    <TableBody>
      {points.map((row) => (
        <TableRow
          key={row.serial}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {row.serial}
          </TableCell>

          <TableCell className="text-center font-medium">{row.id}</TableCell>

          <TableCell className="text-center font-medium">{row.name}</TableCell>

          <TableCell className="text-center" dir="ltr">
            {row.phone}
          </TableCell>

          <TableCell className="text-center font-medium">
            {row.totalPoints}
          </TableCell>

          <TableCell className="text-center text-gray-600">
            {row.usedPoints} من {row.maxPoints}
          </TableCell>

          <TableCell className="text-center font-medium">
            {row.remainingPoints}
          </TableCell>

          <TableCell className="text-center">
            <PointsActions userId={row.id} userName={row.name} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
