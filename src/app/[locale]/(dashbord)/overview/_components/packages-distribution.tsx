"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "الأساسية", value: 35, color: "#0C6175" },
  { name: "الفضية", value: 105, color: "#9ca3af" },
  { name: "الذهبية", value: 140, color: "#22c55e" },
  { name: "البلاتية", value: 25, color: "#111827" },
];

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x - 10}
      y={y}
      textAnchor="start"
      dominantBaseline="middle"
      fontSize={13}
      fill="#6b7280"
    >
      {payload.value}
    </text>
  );
};

export default function PackagesDistribution() {
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
      <p className="font-bold text-gray-900">توزيع الباقات</p>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            strokeDasharray="5 5"
            stroke="#e5e7eb"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            ticks={[0, 35, 70, 105, 140]}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            width={90}
            orientation="left"
            tick={<CustomTick />}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px #0000001A",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={55}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
