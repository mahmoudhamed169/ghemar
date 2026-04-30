import StatCard from "./stat-card";
import { Truck, DollarSign, Activity, ShoppingBag } from "lucide-react";

const stats = [
  {
    title: "إجمالي الطلبات",
    value: "1,284",
    subtitle: "هذا الشهر",
    badge: "+12.4%",
    badgeType: "positive" as const,
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "الطلبات النشطة",
    value: "47",
    subtitle: "الآن",
    badge: "+3",
    badgeType: "positive" as const,
    icon: Activity,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
  },
  {
    title: "الإيرادات",
    value: " 44,800 ر.س",
    subtitle: "هذا الشهر",
    badge: "+6.8%",
    badgeType: "positive" as const,
    icon: DollarSign,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-50",
  },
  {
    title: "الساكنون النشطون",
    value: "18 / 24",
    subtitle: "من إجمالي الساكنين",
    badge: "75%",
    badgeType: "neutral" as const,
    icon: Truck,
    iconColor: "text-green-500",
    iconBg: "bg-green-50",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
