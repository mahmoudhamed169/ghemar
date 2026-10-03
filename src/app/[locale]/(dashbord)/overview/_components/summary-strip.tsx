import { getTranslations } from "next-intl/server";
import {
  Activity,
  CheckCircle2,
  ShoppingBag,
  Truck,
  Wallet,
} from "lucide-react";
import { OverviewData } from "@/shared/lib/types/overview/overview";
import { formatCurrency, formatNumber } from "../_lib/format";

type SummaryProps = Pick<
  OverviewData,
  "totalOrders" | "activeOrders" | "completedOrders" | "totalRevenue" | "activeDrivers"
>;

/** all-time totals returned at the root of the overview response */
export default async function SummaryStrip({
  totalOrders,
  activeOrders,
  completedOrders,
  totalRevenue,
  activeDrivers,
}: SummaryProps) {
  const t = await getTranslations("overview");

  const items = [
    { key: "totalOrders", value: formatNumber(totalOrders), icon: ShoppingBag, color: "text-blue-500" },
    { key: "activeOrders", value: formatNumber(activeOrders), icon: Activity, color: "text-purple-500" },
    { key: "completedOrders", value: formatNumber(completedOrders), icon: CheckCircle2, color: "text-green-600" },
    { key: "totalRevenue", value: formatCurrency(totalRevenue, t("currency")), icon: Wallet, color: "text-yellow-500" },
    { key: "activeDrivers", value: formatNumber(activeDrivers), icon: Truck, color: "text-[#0C6175]" },
  ] as const;

  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "12px",
        padding: "16px 21px",
        border: "0.67px solid #0000001F",
      }}
    >
      <p className="text-xs font-semibold text-gray-400 mb-3">
        {t("summary.title")}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-4 gap-y-3">
        {items.map(({ key, value, icon: Icon, color }) => (
          <div key={key} className="flex items-center gap-2.5 min-w-0">
            <Icon className={`w-4 h-4 shrink-0 ${color}`} />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-500 truncate">
                {t(`summary.${key}`)}
              </span>
              <span className="text-sm font-bold text-gray-900 tabular-nums">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
