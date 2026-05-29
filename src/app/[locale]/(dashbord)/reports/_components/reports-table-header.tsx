import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function ReportsTableHeader() {
  const t = await getTranslations("Reports.table");

  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("serial")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          ID
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("orderNumber")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("clientName")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("package")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("date")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("paidAmount")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("discount")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("status")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("actions")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
