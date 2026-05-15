"use client";
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useTranslations, useLocale } from "next-intl";

const data = [
  { day: "19 أبريل", dayEn: "Apr 19", value: 35 },
  { day: "20 أبريل", dayEn: "Apr 20", value: 45 },
  { day: "21 أبريل", dayEn: "Apr 21", value: 38 },
  { day: "22 أبريل", dayEn: "Apr 22", value: 55 },
  { day: "23 أبريل", dayEn: "Apr 23", value: 48 },
  { day: "24 أبريل", dayEn: "Apr 24", value: 95 },
  { day: "25 أبريل", dayEn: "Apr 25", value: 52 },
];

export default function OrdersChart() {
  const t = useTranslations("overview.charts");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const chartData = data.map((d) => ({
    ...d,
    label: isRtl ? d.day : d.dayEn,
  }));

  return (
    <div
      className="bg-white flex flex-col h-full"
      style={{
        borderRadius: "12px",
        padding: "21px",
        border: "0.67px solid #0000001F",
      }}
    >
      {/* Header */}
      <div className="mb-10" dir={isRtl ? "rtl" : "ltr"}>
        <p className="font-bold text-gray-900">{t("ordersAndRevenue")}</p>
        <p className="text-xs text-gray-400">{t("last7Days")}</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            reversed={isRtl}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
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
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0C6175"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#0C6175" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}