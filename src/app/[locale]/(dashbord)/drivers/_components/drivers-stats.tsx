import { getTranslations } from "next-intl/server";
import { Ban, CircleCheck, Truck, Wifi } from "lucide-react";
import { getDrivers } from "@/shared/lib/services/drivers/get-drivers";
import { DriversParams } from "@/shared/lib/types/drivers/driver";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";

/**
 * No drivers stats endpoint yet: each figure is the real `pagination.total`
 * of GET /api/admin/drivers for one filter (limit=1). The cards break drivers
 * down by status, so they follow the search but ignore the status filter.
 */
export default async function DriversStats({ search }: { search?: string }) {
  const t = await getTranslations("drivers.stats");
  const count = (params: DriversParams) =>
    getDrivers({ ...params, search, page: 1, limit: 1 }).then((r) => r.pagination.total);

  let total: number, active: number, suspended: number, available: number;
  try {
    [total, active, suspended, available] = await Promise.all([
      count({}),
      count({ status: "active" }),
      count({ status: "suspended" }),
      count({ activityStatus: "available" }),
    ]);
  } catch {
    return <StatsError />;
  }

  const format = (n: number) => n.toLocaleString("en-US");

  return (
    <StatsRow>
      <StatCard title={t("total")} value={format(total)} icon={Truck} iconColor="text-blue-500" iconBg="bg-blue-50" />
      <StatCard title={t("active")} value={format(active)} icon={CircleCheck} iconColor="text-green-500" iconBg="bg-green-50" />
      <StatCard title={t("available")} value={format(available)} caption={t("availableHint")} icon={Wifi} iconColor="text-[#0C6175]" iconBg="bg-teal-50" />
      <StatCard title={t("suspended")} value={format(suspended)} icon={Ban} iconColor="text-red-500" iconBg="bg-red-50" />
    </StatsRow>
  );
}
