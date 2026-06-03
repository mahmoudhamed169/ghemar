import { Table } from "@/components/ui/table";
import OrdersTableHeader from "./orders-table-header";
import OrdersTableBody from "./orders-table-body";
import Pagination from "@/shared/components/pagination";
import { Order } from "@/shared/lib/types/orders/order";

interface Props {
  orders: Order[];
  page: number;
  totalPages: number;
}

export default function OrdersTable({ orders, page, totalPages }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 flex flex-col gap-4">
      <div className="overflow-x-auto">
        <Table className="min-w-[900px]">
          <OrdersTableHeader />
          <OrdersTableBody orders={orders} page={page} />
        </Table>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
