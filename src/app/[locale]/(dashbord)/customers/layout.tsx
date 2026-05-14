import React from "react";
import CustomerHeaderPage from "./_components/customer-page-header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" space-y-6  ">
      <CustomerHeaderPage />
      {children}
    </main>
  );
}
