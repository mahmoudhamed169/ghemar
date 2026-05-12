import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import RedeemActions from "./redeem-actions";


async function getRedeems() {
  return Array.from({ length: 7 }, (_, i) => ({
    serial: i + 1,
    id: 66788,
    name: "ماريهان رضوان",
    phone: "+966512345678",
    usedPoints: 20,
    bagsAdded: 100,
    date: "12 يناير 2025",
    time: "11 صباحاً",
  }));
}

export default async function RedeemTableBody() {
  const redeems = await getRedeems();

  return (
    <TableBody>
      {redeems.map((row) => (
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
            {row.usedPoints}
          </TableCell>

          <TableCell className="text-center font-medium">
            {row.bagsAdded}
          </TableCell>

          <TableCell className="text-center text-sm text-gray-600">
            <div>{row.date}</div>
            <div className="text-gray-400">{row.time}</div>
          </TableCell>

          <TableCell className="text-center">
            <RedeemActions redeemId={row.serial} userName={row.name} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
