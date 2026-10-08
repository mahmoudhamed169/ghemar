import React from "react";
import AutoRefresh from "@/shared/components/auto-refresh";
import { revalidateOrders } from "@/shared/lib/actions/orders/revalidate-orders";
import DeliveryEventsRefresher from "./_components/delivery-events-refresher";

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold">الطلبات</h1>
        <AutoRefresh
          intervalMs={60000}
          action={revalidateOrders}
          showButton
        />
      </div>
      <DeliveryEventsRefresher />
      {children}
    </main>
  );
}
