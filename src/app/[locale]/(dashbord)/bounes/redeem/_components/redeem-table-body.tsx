import { getTranslations } from "next-intl/server";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getRedeemHistory } from "@/shared/lib/services/rewards/get-redeem-history";
import RedeemActions from "./redeem-actions";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const date = d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
  return { date, time };
}

export default async function RedeemTableBody() {
  const [t, { data: redeems, pagination }] = await Promise.all([
    getTranslations("Bounes.redeemTable"),
    getRedeemHistory(),
  ]);

  if (!redeems?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="text-center py-16 text-gray-400">
            {t("empty")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const offset = (pagination.page - 1) * pagination.limit;

  return (
    <TableBody>
      {redeems.map((entry, index) => {
        const { date, time } = formatDate(entry.createdAt);
        return (
          <TableRow
            key={entry._id}
            className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
          >
            <TableCell className="text-center text-sm text-gray-500">
              {offset + index + 1}
            </TableCell>

            <TableCell className="text-center font-medium text-xs text-gray-400">
              {entry._id.slice(-6)}
            </TableCell>

            <TableCell className="text-center font-medium">
              {entry.userId?.name ?? entry.userId?.phone ?? t("noName")}
            </TableCell>

            <TableCell className="text-center" dir="ltr">
              {entry.userId?.phone}
            </TableCell>

            <TableCell className="text-center font-medium">
              {entry.points}
            </TableCell>

            <TableCell className="text-center text-sm text-gray-600 max-w-[200px]">
              {entry.description}
            </TableCell>

            <TableCell className="text-center text-sm text-gray-600">
              <div>{date}</div>
              <div className="text-gray-400">{time}</div>
            </TableCell>

            <TableCell className="text-center">
              <RedeemActions
                redeemId={entry._id}
                userName={entry.userId?.name ?? entry.userId?.phone ?? ""}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
