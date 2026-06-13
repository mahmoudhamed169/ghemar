import { getTranslations } from "next-intl/server";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getRewardsPoints } from "@/shared/lib/services/rewards/get-rewards-points";
import PointsActions from "./points-actions";

interface Props {
  page?: number;
  search?: string;
  minPoints?: number;
  maxPoints?: number;
}

export default async function PointsTableBody({ page, search, minPoints, maxPoints }: Props) {
  const [t, { data: users, pagination }] = await Promise.all([
    getTranslations("Bounes.pointsTable"),
    getRewardsPoints({ page, search, minPoints, maxPoints }),
  ]);

  if (!users?.length) {
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
      {users.map((user, index) => {
        const usedPoints = user.totalPointsEarned - user.currentPoints;

        return (
          <TableRow
            key={user._id}
            className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
          >
            <TableCell className="text-center text-sm text-gray-500">
              {offset + index + 1}
            </TableCell>

            <TableCell className="text-center font-medium text-xs text-gray-400">
              {user._id.slice(-6)}
            </TableCell>

            <TableCell className="text-center font-medium">
              {user.name ?? t("noName")}
            </TableCell>

            <TableCell className="text-center" dir="ltr">
              {user.phone}
            </TableCell>

            <TableCell className="text-center font-medium">
              {user.totalPointsEarned}
            </TableCell>

            <TableCell className="text-center text-gray-600">
              {usedPoints}
            </TableCell>

            <TableCell className="text-center font-medium">
              {user.currentPoints}
            </TableCell>

            <TableCell className="text-center">
              <PointsActions
                userId={user._id}
                userName={user.name ?? user.phone}
              />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
