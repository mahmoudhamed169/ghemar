"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "مكتمل", value: 68, color: "#22c55e" },
  { name: "جارٍ", value: 18, color: "#3b82f6" },
  { name: "قيد الانتظار", value: 10, color: "#f59e0b" },
  { name: "مشكلة", value: 4, color: "#ef4444" },
];

export default function OrdersDistribution() {
  return (
    <div
      className="bg-white flex flex-col flex-1"
      style={{
        borderRadius: "12px",
        paddingTop: "21px",
        paddingRight: "20px",
        paddingBottom: "21px",
        paddingLeft: "20px",
        border: "0.67px solid #0000001F",
        gap: "12px",
      }}
    >
      {/* Header */}
      <p className="font-bold text-gray-900 mb-5">توزيع الطلبات</p>

      {/* Chart */}
      <div className="flex justify-center">
        <PieChart width={220} height={160}>
          <Pie
            data={data}
            cx={110}
            cy={80}
            innerRadius={50}
            outerRadius={78}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px #0000001A",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 mt-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-500">{item.name}</span>
            </div>

            <span className="text-sm font-semibold text-gray-700">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
