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

export default function MonthlyRevenue() {
  const t = useTranslations("overview.charts");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const data = [
    { monthKey: "jan", value: 28000 },
    { monthKey: "feb", value: 32000 },
    { monthKey: "mar", value: 29000 },
    { monthKey: "apr", value: 46000 },
  ].map((d) => ({ ...d, label: t(d.monthKey) }));

  return (
    <div
      className="bg-white flex flex-col h-full"
      style={{
        borderRadius: "12px",
        padding: "21px",
        border: "0.67px solid #0000001F",
        gap: "12px",
      }}
    >
      <p className="font-bold text-gray-900 mb-5" dir={isRtl ? "rtl" : "ltr"}>
        {t("monthlyRevenue")}
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 9, right: 10, left: 20, bottom: 0 }}
          barCategoryGap="55%"
        >
          <CartesianGrid
            strokeDasharray="5 5"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            reversed={isRtl}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickCount={5}
            domain={[0, 60000]}
            tickFormatter={(v) => v.toLocaleString()}
            width={55}
            orientation={isRtl ? "right" : "left"}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px #0000001A",
              fontSize: "12px",
              direction: isRtl ? "rtl" : "ltr",
            }}
            formatter={(value) => [
              (value as number)?.toLocaleString() + (isRtl ? " ر.س" : " SAR"),
              t("revenue"),
            ]}
          />
          <Bar
            dataKey="value"
            fill="#0C6175"
            radius={[4, 4, 0, 0]}
            barSize={83}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
