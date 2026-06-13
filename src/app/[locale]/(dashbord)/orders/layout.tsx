import React from "react";
import OrdersFilters from "./_components/orders-filter";
import OrdersStatusFilter from "./_components/orders-status-filter";
import AutoRefresh from "@/shared/components/auto-refresh";

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold">الطلبات</h1>
      <OrdersFilters />
      <OrdersStatusFilter variant="unified" />
      {children}
      <AutoRefresh intervalMs={2000} />
    </main>
  );
}
