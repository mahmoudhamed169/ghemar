import React, { Suspense } from "react";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";
import OffersHeaderPage from "./_components/offer-header-page";
import OffersStat from "./_components/offers-stat";
import CodesFilter from "./_components/codes-filter";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-4">
      <OffersHeaderPage />
      <Suspense fallback={<StatsRowSkeleton />}>
        <OffersStat />
      </Suspense>
      {/* <CodesFilter /> */}
      {children}
    </main>
  );
}
