import React, { Suspense } from "react";
import BounesHeaderPage from "./_components/bounes-header-page";
import BunesStates from "./_components/bunes-states";
import BounesNav from "./_components/bounes-nav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-4">
      <BounesHeaderPage />
      <Suspense>
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
