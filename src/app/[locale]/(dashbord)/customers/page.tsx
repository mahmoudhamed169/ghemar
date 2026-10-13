import { Suspense } from "react";
import CustomersTable from "./_components/customers-table";
import CustomerHeaderPage from "./_components/customer-page-header";
import CustomersStats from "./_components/customers-stats";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";
import {
  BAGS_FILTERS,
  BagsFilter,
  CustomersFilter,
} from "@/shared/lib/types/customers/labels";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    branchId?: string;
    bagsFilter?: string;
    area?: string;
    labelId?: string;
  }>;
}

export default async function CustomersPage({ searchParams }: Props) {
  const { page, search, branchId, bagsFilter, area, labelId } = await searchParams;
  const currentPage = Number(page) || 1;

  // only the filters that are set — the same object goes to the label members endpoints
  const filter: CustomersFilter = {
    ...(search && { search }),
    ...(branchId && { branchId }),
    ...(BAGS_FILTERS.includes(bagsFilter as BagsFilter) && {
      bagsFilter: bagsFilter as BagsFilter,
    }),
    ...(area && { area }),
    ...(labelId && { labelId }),
  };

  return (
    <main className="space-y-6">
      <CustomerHeaderPage />
      <Suspense key={JSON.stringify(filter)} fallback={<StatsRowSkeleton count={1} />}>
        <CustomersStats filter={filter} />
      </Suspense>
      <CustomersTable page={currentPage} filter={filter} />
    </main>
  );
}
