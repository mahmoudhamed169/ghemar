import { TableBody, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { getTranslations, getLocale } from "next-intl/server";

import CustomerActions from "./customer-actions";
import DetailsRow from "@/shared/components/details-row";
import { Customer } from "@/shared/lib/types/customers";

interface Props {
  customers: Customer[];
  /** rows before this page: (page - 1) * pageSize */
  offset: number;
}

export default async function CustomersTableBody({ customers, offset }: Props) {
  const [t, locale] = await Promise.all([
    getTranslations("customers.table"),
    getLocale(),
  ]);

  return (
    <TableBody>
      {customers.map((customer: Customer, index: number) => (
        <DetailsRow
          key={customer._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {offset + index + 1}
          </TableCell>
          <TableCell className="text-center font-medium text-sm">
            {customer._id.slice(-6).toUpperCase()}
          </TableCell>
          <TableCell className="text-center font-medium">
            {customer.name ?? "—"}
          </TableCell>
          <TableCell className="text-center" dir="ltr">
            {customer.phone}
          </TableCell>
          <TableCell className="text-center">
            {customer.currentPackage ? (
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-semibold">
                  {customer.currentPackage.nameAr}
                </span>
                <span className="text-xs text-gray-400">
                  ({customer.availableBags} {t("bags")})
                </span>
              </div>
            ) : (
              <span className="text-gray-400 text-sm">—</span>
            )}
          </TableCell>
          <TableCell className="text-center text-sm">
            {typeof customer.branchId === "object" && customer.branchId !== null
              ? (locale === "ar" ? customer.branchId.nameAr || customer.branchId.name : customer.branchId.name)
              : <span className="text-gray-300">—</span>}
          </TableCell>
          <TableCell className="text-center">
            <Switch
              checked={customer.isActive}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
            />
          </TableCell>
          <TableCell className="text-center">
            <CustomerActions customer={customer} />
          </TableCell>
        </DetailsRow>
      ))}
    </TableBody>
  );
}
