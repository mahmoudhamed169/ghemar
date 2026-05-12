// orders-table-body.tsx

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import OrderPriorityBadge from "./order-priority-badge";
import OrderStatusBadge, { type OrderStatus } from "./order-status-badge";
import OrderSortAction from "./order-sort-action";
import OrderActions from "./order-actions";
import OrderStatusToggle from "./order-status-toggle";

type OrderPriority = "مستعجل" | "عادي";

interface Order {
  id: number;
  serial: number;
  driverName: string;
  priority: OrderPriority;
  status: OrderStatus;
}

async function getOrders(): Promise<Order[]> {
  const statuses: OrderStatus[] = [
    "قيد التعيين",
    "قيد الاستلام",
    "في المغسلة",
    "قيد التسليم",
    "المكتملة",
    "الملغية",
    "الملغية",
  ];

  const priorities: OrderPriority[] = [
    "مستعجل",
    "عادي",
    "عادي",
    "عادي",
    "عادي",
    "مستعجل",
    "مستعجل",
  ];

  return Array.from({ length: 7 }, (_, i) => ({
    id: 66788,
    serial: i + 1,
    driverName: "ماريهان رضوان",
    priority: priorities[i],
    status: statuses[i],
  }));
}

export default async function OrdersTableBody() {
  const orders = await getOrders();

  return (
    <TableBody>
      {orders.map((order) => (
        <TableRow
          key={order.serial}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          {/* الرقم التسلسلي */}
          <TableCell className="text-center text-sm text-gray-500">
            {order.serial}
          </TableCell>

          {/* رقم الطلب */}
          <TableCell className="text-center font-medium">{order.id}</TableCell>

          {/* اسم السائق */}
          <TableCell className="text-center font-medium">
            {order.driverName}
          </TableCell>

          {/* الأولوية */}
          <TableCell className="text-center">
            <OrderPriorityBadge priority={order.priority} />
          </TableCell>

          {/* حالة الأوردر */}
          <TableCell className="text-center">
            <OrderStatusBadge status={order.status} />
          </TableCell>

          {/* تغيير حالة الأوردر */}
          <TableCell className="text-center">
            <OrderStatusToggle
              currentStatus={order.status}
              orderId={order.id}
            />
          </TableCell>

          {/* اجراء الفرز */}
          <TableCell className="text-center">
            <OrderSortAction orderId={order.id} />
          </TableCell>

          {/* إجراءات */}
          <TableCell className="text-center">
            <OrderActions orderId={order.id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}