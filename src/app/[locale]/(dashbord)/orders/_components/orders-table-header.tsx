import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function OrdersTableHeader() {
  const t = await getTranslations("orders.table");

  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("serial")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("order_number")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("driver_name")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("priority")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("order_status")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("change_status")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("sort_action")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("actions")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
