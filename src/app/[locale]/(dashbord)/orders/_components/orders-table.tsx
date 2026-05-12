import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import OrdersTableHeader from "./orders-table-header";
import OrdersTableBody from "./orders-table-body";

export default function OrdersTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <OrdersTableHeader />
        <Suspense fallback={null}>
          <OrdersTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
