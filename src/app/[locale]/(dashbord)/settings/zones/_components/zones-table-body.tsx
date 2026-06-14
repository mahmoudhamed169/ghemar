import { getTranslations } from "next-intl/server";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getCities } from "@/shared/lib/services/zones/get-cities";
import ZoneStatusBadge from "./zone-status-badge";
import CityStatusToggle from "./city-status-toggle";
import ZoneActions from "./zone-actions";

interface ZonesTableBodyProps {
  search?: string;
  isActive?: boolean;
}

export default async function ZonesTableBody({ search, isActive }: ZonesTableBodyProps) {
  const [t, { data: cities }] = await Promise.all([
    getTranslations("Zones.table"),
    getCities({ search, isActive }),
  ]);

  if (!cities?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="text-center py-16 text-gray-400">
            {t("empty")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {cities.map((city, index) => (
        <TableRow
          key={city._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {index + 1}
          </TableCell>

          <TableCell className="text-center">
            <p className="font-medium">{city.nameAr}</p>
            <p className="text-xs text-gray-400">{city.name}</p>
          </TableCell>

          <TableCell className="text-center font-mono text-sm font-medium">
            {city.code}
          </TableCell>

          <TableCell className="text-center">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0C6175]/10 text-[#0C6175] text-sm font-semibold">
              {city.areas?.length ?? 0}
            </span>
          </TableCell>

          <TableCell className="text-center">
            <ZoneStatusBadge isActive={city.isActive} />
          </TableCell>

          <TableCell className="text-center">
            <CityStatusToggle cityId={city._id} initialActive={city.isActive} />
          </TableCell>

          <TableCell className="text-center">
            <ZoneActions city={city} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
