import React, { Suspense } from "react";
import BounesHeaderPage from "./_components/bounes-header-page";
import BunesStates from "./_components/bunes-states";
import BounesNav from "./_components/bounes-nav";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-4">
      <BounesHeaderPage />
      <Suspense fallback={<StatsRowSkeleton />}>
        <BunesStates />
      </Suspense>
      <BounesNav />
      {/* 
      <ReportsStates />
      <ReportsFilters /> */}

      {children}
    </main>
  );
}
