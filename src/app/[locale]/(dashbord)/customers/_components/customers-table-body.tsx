import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import CustomerActions from "./customer-actions";

async function getCustomers() {
  return Array.from({ length: 7 }, (_, i) => ({
    id: 66788,
    serial: i + 1,
    name: "ماريهان رضوان",
    phone: "+966512345678",
    package: "الحقيبة الأساسية",
    bags: 4,
    active: i < 4,
  }));
}

export default async function CustomersTableBody() {
  const customers = await getCustomers();

  return (
    <TableBody>
      {customers.map((customer) => (
        <TableRow
          key={customer.serial}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {customer.serial}
          </TableCell>
          <TableCell className="text-center font-medium">
            {customer.id}
          </TableCell>
          <TableCell className="text-center font-medium">
            {customer.name}
          </TableCell>
          <TableCell className="text-center" dir="ltr">
            {customer.phone}
          </TableCell>
          <TableCell className="text-center">
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-semibold text-lg">{customer.package}</span>
              <span className="text-xs text-gray-400">
                ({customer.bags} أكياس)
              </span>
            </div>
          </TableCell>
          <TableCell className="text-center">
            <Switch
              checked={customer.active}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
            />
          </TableCell>
          <TableCell className="text-center">
            <CustomerActions customerName="ماريهان رضوان"  />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
