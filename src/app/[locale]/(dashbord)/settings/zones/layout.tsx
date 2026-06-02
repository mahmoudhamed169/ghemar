import React, { Suspense } from "react";
import ZonesHeaderPage from "./_components/zones-header-page";
import ZonesStates from "./_components/zones-states";
import ZonesFilters from "./_components/zone-filtration";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <ZonesHeaderPage />
      <Suspense>
        <ZonesStates />
      </Suspense>
      <ZonesFilters />
      {children}
    </main>
  );
}
