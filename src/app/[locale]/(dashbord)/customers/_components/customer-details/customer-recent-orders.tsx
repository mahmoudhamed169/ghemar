"use client";

import { useTranslations } from "next-intl";
import { CustomerDetailRecentOrder } from "@/shared/lib/types/customers";
import { PackageOpen } from "lucide-react";

interface Props {
  orders: CustomerDetailRecentOrder[];
}

const STATUS_STYLES: Record<string, string> = {
  pending:   "bg-yellow-50 text-yellow-600",
  completed: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-500",
  delivered: "bg-blue-50 text-blue-600",
};

export default function CustomerRecentOrders({ orders }: Props) {
  const t = useTranslations("customers.details");

  return (
    <div className="space-y-3 border-t border-gray-100 pt-3" dir="rtl">
      <h3 className="text-sm font-semibold text-gray-500">{t("recentOrders")}</h3>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-6 text-gray-300">
          <PackageOpen className="w-8 h-8" />
          <p className="text-sm">{t("noOrders")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 text-sm"
            >
              <span className="font-mono text-[#000709] font-medium" dir="ltr">
                {order.orderNumber}
              </span>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status] ?? "bg-gray-100 text-gray-500"}`}
              >
                {t(`orderStatus.${order.status}`) ?? order.status}
              </span>
              <span className="text-gray-400 text-xs" dir="ltr">
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
