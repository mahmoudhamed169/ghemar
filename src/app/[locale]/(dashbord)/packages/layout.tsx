import React from "react";
import PackagesHeaderPage from "./_components/packages-header-page";
import PackagesStats from "./_components/packages-stats";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-4">
      <PackagesHeaderPage />

      <PackagesStats />
      {children}
    </main>
  );
}
