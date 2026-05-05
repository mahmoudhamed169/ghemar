// packages-stats.tsx

import { Package, PackageCheck, PackageOpen, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "إجمالي الباقات",
    value: "4",
    icon: Package,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "اشتراكات نشطة",
    value: "284",
    icon: PackageCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "أكثر باقة طلباً",
    value: "الذهبية",
    icon: TrendingUp,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    label: "إيرادات الباقات",
    value: "28,450 ر.س",
    icon: PackageOpen,
    iconBg: "bg-teal-50",
    iconColor: "text-[#0C6175]",
  },
];

export default function PackagesStats() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white min-h-[77px] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm border border-gray-100"
        >
          <div
            className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}
          >
            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
          </div>
          <div className="text-right space-y-1">
            <p className="text-2xl font-bold text-[#000709]">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
