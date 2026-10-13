import { getTranslations } from "next-intl/server";
import { Users } from "lucide-react";
import { getCustomers } from "@/shared/lib/services/customers/get-customers";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";
import { CustomersFilter } from "@/shared/lib/types/customers/labels";

interface Props {
  filter: CustomersFilter;
}

/**
 * Only the total is available from the API today (pagination.total of
 * GET /api/admin/users). Customers with a package and active/inactive counts
 * need a stats endpoint on the backend.
 */
export default async function CustomersStats({ filter }: Props) {
  const t = await getTranslations("customers.stats");

  let total: number;
  try {
    const { pagination } = await getCustomers({ page: 1, limit: 1, ...filter });
    total = pagination.total;
  } catch {
    return <StatsError />;
  }

  const isFiltered = Object.keys(filter).length > 0;

  return (
    <StatsRow>
      <StatCard
        title={t("totalCustomers")}
        value={total.toLocaleString("en-US")}
        caption={isFiltered ? t("matchingFilters") : t("allCustomers")}
        icon={Users}
        iconColor="text-blue-500"
        iconBg="bg-blue-50"
      />
    </StatsRow>
  );
}
