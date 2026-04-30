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

const data = [
  { month: "يناير", value: 28000 },
  { month: "فبراير", value: 32000 },
  { month: "مارس", value: 29000 },
  { month: "أبريل", value: 46000 },
];

export default function MonthlyRevenue() {
  return (
    <div
      className="bg-white flex flex-col flex-1"
      style={{
        borderRadius: "12px",
        padding: "21px",
        border: "0.67px solid #0000001F",
        gap: "12px",
      }}
    >
      <p className="font-bold text-gray-900 mb-5">الإيرادات الشهرية (ر.س)</p>

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
            dataKey="month"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickCount={5}
            domain={[0, 60000]}
            tickFormatter={(v) => v.toLocaleString()}
            width={55}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px #0000001A",
              fontSize: "12px",
            }}
            formatter={(value: number) => [
              value.toLocaleString() + " ر.س",
              "الإيرادات",
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
