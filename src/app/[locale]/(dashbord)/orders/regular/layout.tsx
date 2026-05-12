import React from "react";
import PageTitle from "./_components/page-title";
import OrdersFilters from "../_components/orders-filter";
import OrdersTable from "../_components/orders-table";
import OrdersStatusFilter from "../_components/orders-status-filter";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <PageTitle />
      <OrdersFilters />
      <OrdersStatusFilter />
      
      {children}
    </main>
  );
}
