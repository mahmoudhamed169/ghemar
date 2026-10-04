import { getTranslations } from "next-intl/server";
import { Users } from "lucide-react";
import { getCustomers } from "@/shared/lib/services/customers/get-customers";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";

interface Props {
  search: string;
  branchId?: string;
}

/**
 * Only the total is available from the API today (pagination.total of
 * GET /api/admin/users). Customers with a package and active/inactive counts
 * need a stats endpoint on the backend.
 */
export default async function CustomersStats({ search, branchId }: Props) {
  const t = await getTranslations("customers.stats");

  let total: number;
  try {
    const { pagination } = await getCustomers({ page: 1, limit: 1, search, branchId });
    total = pagination.total;
  } catch {
    return <StatsError />;
  }

  const isFiltered = Boolean(search || branchId);

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
