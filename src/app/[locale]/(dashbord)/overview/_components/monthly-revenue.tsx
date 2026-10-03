"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations, useLocale } from "next-intl";
import { MonthlyRevenueItem } from "@/shared/lib/types/overview/overview";
import { formatCurrency, formatNumber, niceMax } from "../_lib/format";
import ChartCard from "./chart-card";
import ChartEmpty from "./chart-empty";
import ChartTooltip from "./chart-tooltip";

const BAR_COLOR = "#0C6175";
const AXIS_TICK = { fontSize: 11, fill: "#9ca3af" };

export default function MonthlyRevenue({ data }: { data: MonthlyRevenueItem[] }) {
  const t = useTranslations("overview");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const currency = t("currency");

  const total = data.reduce((sum, d) => sum + d.revenue, 0);

  return (
    <ChartCard
      title={t("charts.monthlyRevenue")}
      subtitle={t("charts.lastMonths", { count: data.length })}
      action={
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400">{t("charts.periodTotal")}</span>
          <span className="text-sm font-bold text-gray-900 tabular-nums">
            {formatCurrency(total, currency)}
          </span>
        </div>
      }
    >
      <div className="relative" dir="ltr">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="month"
              tick={AXIS_TICK}
              axisLine={false}
              tickLine={false}
              reversed={isRtl}
            />
            <YAxis
              orientation={isRtl ? "right" : "left"}
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
                      { dataKey: "revenue", label: t("charts.revenue"), color: BAR_COLOR, format: (v) => formatCurrency(v, currency) },
                    ]}
                  />
                </div>
              )}
            />
            <Bar dataKey="revenue" fill={BAR_COLOR} radius={[4, 4, 0, 0]} maxBarSize={56} />
          </BarChart>
        </ResponsiveContainer>
        {total === 0 && <ChartEmpty message={t("charts.noRevenue")} />}
      </div>
    </ChartCard>
  );
}
