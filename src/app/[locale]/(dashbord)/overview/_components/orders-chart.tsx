"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "19 أبريل", value: 35 },
  { day: "20 أبريل", value: 45 },
  { day: "21 أبريل", value: 38 },
  { day: "22 أبريل", value: 55 },
  { day: "23 أبريل", value: 48 },
  { day: "24 أبريل", value: 95 },
  { day: "25 أبريل", value: 52 },
];

export default function OrdersChart() {
  return (
    <div
      className="bg-white flex flex-col flex-1"
      style={{
        borderRadius: "12px",
        padding: "21px",
        border: "0.67px solid #0000001F",
      }}
    >
      {/* Header */}
      <div className="mb-10">
        <p className="font-bold text-gray-900">الطلبات والإيرادات</p>
        <p className="text-xs text-gray-400">آخر 7 أيام</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px #0000001A",
              fontSize: "12px",
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
