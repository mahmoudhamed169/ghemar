import { Suspense } from "react";
import DriverHeaderPage from "./_components/driver-header-page";
import DriversTable from "./_components/drivers-table";
import DriversStats from "./_components/drivers-stats";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function DriversPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? undefined;
  const status = params.status ?? undefined;

  return (
    <main className="space-y-6">
      <DriverHeaderPage />
      <Suspense key={search ?? ""} fallback={<StatsRowSkeleton />}>
        <DriversStats search={search} />
      </Suspense>
      <DriversTable page={page} search={search} status={status} />
    </main>
  );
}
