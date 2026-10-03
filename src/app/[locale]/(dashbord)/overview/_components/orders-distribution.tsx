"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslations, useLocale } from "next-intl";
import { OrderStatusItem } from "@/shared/lib/types/overview/overview";
import { formatNumber } from "../_lib/format";
import ChartCard from "./chart-card";

const STATUS_COLORS: Record<string, string> = {
  completed: "#22c55e",
  in_progress: "#3b82f6",
  pending: "#f59e0b",
  problem: "#ef4444",
};
const FALLBACK_COLOR = "#9ca3af";
const EMPTY_RING = [{ value: 1 }];

export default function OrdersDistribution({ data }: { data: OrderStatusItem[] }) {
  const t = useTranslations("overview");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const items = data.map((item) => {
    const key = `charts.statuses.${item.status}`;
    return {
      ...item,
      name: t.has(key) ? t(key) : item.label,
      color: STATUS_COLORS[item.status] ?? FALLBACK_COLOR,
    };
  });
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const isEmpty = total === 0;

  return (
    <ChartCard title={t("charts.ordersDistribution")}>
      <div className="relative h-[200px]" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {isEmpty ? (
              <Pie
                data={EMPTY_RING}
                dataKey="value"
                innerRadius={62}
                outerRadius={88}
                fill="#f3f4f6"
                strokeWidth={0}
                isAnimationActive={false}
              />
            ) : (
              <Pie
                data={items.filter((item) => item.count > 0)}
                dataKey="count"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={items.filter((i) => i.count > 0).length > 1 ? 2 : 0}
                strokeWidth={0}
              >
                {items
                  .filter((item) => item.count > 0)
                  .map((item) => (
                    <Cell key={item.status} fill={item.color} />
                  ))}
              </Pie>
            )}
            {!isEmpty && (
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px #0000001A",
                  fontSize: "12px",
                  direction: isRtl ? "rtl" : "ltr",
                }}
                formatter={(value, name) => [formatNumber(Number(value)), name]}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-gray-900 tabular-nums">
            {formatNumber(total)}
          </span>
          <span className="text-xs text-gray-400">
            {isEmpty ? t("charts.noOrders") : t("charts.totalOrders")}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div key={item.status} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-500 truncate">{item.name}</span>
            </div>
            <div className="flex items-center gap-2 tabular-nums">
              <span className="text-sm font-semibold text-gray-700">
                {formatNumber(item.count)}
              </span>
              <span className="text-xs text-gray-400 w-12 text-end">
                {formatNumber(item.percentage)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
