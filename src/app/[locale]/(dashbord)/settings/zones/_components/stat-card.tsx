import React from "react";

export type StatCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg?: string; // tailwind bg class e.g. "bg-orange-100"
  iconColor?: string; // tailwind text class e.g. "text-orange-500"
};

export default function StatCard({
  label,
  value,
  icon,
  iconBg = "bg-gray-100",
  iconColor = "text-gray-500",
}: StatCardProps) {
  return (
    <div className="flex flex-1 items-center gap-6  rounded-2xl bg-white px-5 py-4 shadow-sm border border-gray-100">
      {/* Icon side */}
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      {/* Text side */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-3xl font-bold text-gray-800 leading-none">
          {value}
        </span>
        <span className="text-sm text-gray-400 mt-1">{label}</span>
      </div>
    </div>
  );
}
