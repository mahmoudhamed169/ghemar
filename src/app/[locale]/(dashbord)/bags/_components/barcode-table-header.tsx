import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function BarcodeTableHeader() {
  const t = await getTranslations("Bags.table.headers");

  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("barcode")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("status")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("client")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("driver")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("order")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("createdAt")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("actions")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}