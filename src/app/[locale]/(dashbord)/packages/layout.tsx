import React, { Suspense } from "react";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";
import PackagesHeaderPage from "./_components/packages-header-page";
import PackagesStats from "./_components/packages-stats";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <PackagesHeaderPage />
      <Suspense fallback={<StatsRowSkeleton />}>
        <PackagesStats />
      </Suspense>
      {children}
    </main>
  );
}
