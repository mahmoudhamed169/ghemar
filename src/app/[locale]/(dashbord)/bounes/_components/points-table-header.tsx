import { getTranslations } from "next-intl/server";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function PointsTableHeader() {
  const t = await getTranslations("Bounes.pointsTable");

  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("serial")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("id")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("name")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("phone")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("totalPoints")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("usedPoints")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("remainingPoints")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("actions")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
