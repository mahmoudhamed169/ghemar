import React from "react";
import BounesHeaderPage from "./_components/bounes-header-page";
import BunesStates from "./_components/bunes-states";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <BounesHeaderPage />
      <BunesStates />
      {/* 
      <ReportsStates />
      <ReportsFilters /> */}

      {children}
    </main>
  );
}
