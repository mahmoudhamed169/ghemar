import React from "react";
import AutoRefresh from "@/shared/components/auto-refresh";
import PageTitle from "./_components/page-title";
import OrdersFilters from "../_components/orders-filter";
import OrdersStatusFilter from "../_components/orders-status-filter";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <PageTitle />
      <OrdersFilters />
      <OrdersStatusFilter variant="package" />
      {children}
      <AutoRefresh intervalMs={2000} />
    </main>
  );
}
