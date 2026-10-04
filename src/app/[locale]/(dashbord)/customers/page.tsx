import { Suspense } from "react";
import CustomersTable from "./_components/customers-table";
import CustomerHeaderPage from "./_components/customer-page-header";
import CustomersStats from "./_components/customers-stats";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";

interface Props {
  searchParams: Promise<{ page?: string; search?: string; branchId?: string }>;
}

export default async function CustomersPage({ searchParams }: Props) {
  const { page, search, branchId } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentSearch = search ?? "";
  const currentBranchId = branchId ?? undefined;

  return (
    <main className="space-y-6">
      <CustomerHeaderPage />
      <Suspense
        key={`${currentSearch}|${currentBranchId ?? ""}`}
        fallback={<StatsRowSkeleton count={1} />}
      >
        <CustomersStats search={currentSearch} branchId={currentBranchId} />
      </Suspense>
      <CustomersTable page={currentPage} search={currentSearch} branchId={currentBranchId} />
    </main>
  );
}
