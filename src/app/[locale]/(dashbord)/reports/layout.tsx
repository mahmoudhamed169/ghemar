import React, { Suspense } from "react";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";
import ReportesHeaderPage from "./_components/reportes-header-page";
import ReportsStates from "./_components/reports-states";
import ReportsFilters from "./_components/reports-filter";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <ReportesHeaderPage />
      <Suspense fallback={<StatsRowSkeleton />}>
        <ReportsStates />
      </Suspense>
      <ReportsFilters />

      {children}
    </main>
  );
}
