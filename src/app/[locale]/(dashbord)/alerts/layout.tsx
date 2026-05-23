import React from "react";
import PageHeader from "./_components/page-header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-4">
      <PageHeader />
      {children}
    </main>
  );
}
