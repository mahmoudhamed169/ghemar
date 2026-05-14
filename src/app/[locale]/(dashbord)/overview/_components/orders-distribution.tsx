"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTranslations, useLocale } from "next-intl";

export default function OrdersDistribution() {
  const t = useTranslations("overview.charts");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const data = [
    { key: "completed", value: 68, color: "#22c55e" },
    { key: "inProgress", value: 18, color: "#3b82f6" },
    { key: "pending",    value: 10, color: "#f59e0b" },
    { key: "issue",      value: 4,  color: "#ef4444" },
  ];

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
      {/* Header */}
      <p
        className="font-bold text-gray-900 mb-5"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {t("ordersDistribution")}
      </p>

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
              direction: isRtl ? "rtl" : "ltr",
            }}
          />
        </PieChart>
      </div>

      {/* Legend */}
      <div
        className="flex flex-col gap-2 mt-3"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {data.map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-500">{t(item.key)}</span>
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