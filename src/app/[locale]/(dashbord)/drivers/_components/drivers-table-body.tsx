import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { getDrivers } from "@/shared/lib/services/drivers/get-drivers";
import { Driver, DriverStatus } from "@/shared/lib/types/drivers/driver";
import DriverStatusBadge from "./driver-status-badge";
import DriverStatusToggle from "./driver-status-toggle";
import DriverActions from "./driver-actions";

interface Props {
  page: number;
  search?: string;
  status?: string;
}

export default async function DriversTableBody({
  page,
  search,
  status,
}: Props) {
  const [{ data: drivers }, t] = await Promise.all([
    getDrivers({ page, search, status: status as DriverStatus | undefined }),
    getTranslations("drivers.table"),
  ]);

  if (!drivers.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={7}
            className="text-center text-gray-400 py-12 text-sm"
          >
            {t("no_drivers")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {drivers.map((driver: Driver, index: number) => (
        <TableRow
          key={driver._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {(page - 1) * 20 + index + 1}
          </TableCell>
          <TableCell className="text-center font-medium text-sm">
            {driver._id.slice(-6).toUpperCase()}
          </TableCell>
          <TableCell className="text-center font-medium">
            {driver.name}
          </TableCell>
          <TableCell className="text-center" dir="ltr">
            {driver.phone}
          </TableCell>
          <TableCell className="text-center">
            <DriverStatusBadge status={driver.status} />
          </TableCell>
          <TableCell className="text-center">
            <div  className="flex items-center justify-center">
              <DriverStatusToggle
                currentStatus={driver.status}
                driverId={driver._id}
              />
            </div>
          </TableCell>
          <TableCell className="text-center">
            <DriverActions driver={driver} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
