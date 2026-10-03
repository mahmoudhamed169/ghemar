"use client";
import {
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations, useLocale } from "next-intl";
import { DailyTrendItem } from "@/shared/lib/types/overview/overview";
import { formatCurrency, formatNumber, niceMax } from "../_lib/format";
import ChartCard from "./chart-card";
import ChartEmpty from "./chart-empty";
import ChartTooltip from "./chart-tooltip";

const ORDERS_COLOR = "#0C6175";
const REVENUE_COLOR = "#22c55e";
const AXIS_TICK = { fontSize: 11, fill: "#9ca3af" };

export default function OrdersTrend({ data }: { data: DailyTrendItem[] }) {
  const t = useTranslations("overview");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const currency = t("currency");

  const totalOrders = data.reduce((sum, d) => sum + d.ordersCount, 0);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const isEmpty = totalOrders === 0 && totalRevenue === 0;

  const legend = [
    { label: t("charts.orders"), value: formatNumber(totalOrders), color: ORDERS_COLOR },
    { label: t("charts.revenue"), value: formatCurrency(totalRevenue, currency), color: REVENUE_COLOR },
  ];

  return (
    <ChartCard
      title={t("charts.ordersAndRevenue")}
      subtitle={t("charts.last7Days")}
      action={
        <div className="flex flex-wrap gap-4">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-500">{item.label}</span>
              <span className="text-sm font-bold text-gray-900 tabular-nums">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      }
    >
      <div className="relative" dir="ltr">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="overview-revenue-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={REVENUE_COLOR} stopOpacity={0.25} />
                <stop offset="100%" stopColor={REVENUE_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              reversed={isRtl}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="orders"
              orientation={isRtl ? "right" : "left"}
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              domain={[0, (max: number) => niceMax(max)]}
              width={36}
            />
            <YAxis
              yAxisId="revenue"
              orientation={isRtl ? "left" : "right"}
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              domain={[0, (max: number) => niceMax(max)]}
              tickFormatter={(v: number) => formatNumber(v)}
              width={48}
            />
            <Tooltip
              cursor={{ fill: "#0C61750D" }}
              content={(props) => (
                <div dir={isRtl ? "rtl" : "ltr"}>
                  <ChartTooltip
                    active={props.active}
                    label={props.label as string}
                    payload={props.payload as never}
                    rows={[
                      { dataKey: "ordersCount", label: t("charts.orders"), color: ORDERS_COLOR, format: formatNumber },
                      { dataKey: "revenue", label: t("charts.revenue"), color: REVENUE_COLOR, format: (v) => formatCurrency(v, currency) },
                    ]}
                  />
                </div>
              )}
            />
            <Bar
              yAxisId="orders"
              dataKey="ordersCount"
              fill={ORDERS_COLOR}
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Area
              yAxisId="revenue"
              type="monotone"
              dataKey="revenue"
              stroke={REVENUE_COLOR}
              strokeWidth={2.5}
              fill="url(#overview-revenue-fill)"
              dot={{ r: 3, fill: REVENUE_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
        {isEmpty && <ChartEmpty message={t("charts.noTrend")} />}
      </div>
    </ChartCard>
  );
}
