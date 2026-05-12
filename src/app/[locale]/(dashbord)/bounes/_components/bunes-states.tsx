import { RefreshCw, Users, Zap, Star } from "lucide-react";
import StatCard from "./stat-card";

const stats = [
  {
    icon: <RefreshCw />,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    value: "٨٦٢",
    label: "عملية",
    subLabel: "عمليات الاستبدال",
    trend: "-٣٪",
    trendUp: false,
  },
  {
    icon: <Users />,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    value: "٢,٣٤١",
    label: "مستخدم",
    subLabel: "المستخدمون النشطون",
    trend: "+٤٤٪",
    trendUp: true,
  },
  {
    icon: <Zap />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    value: "٤٨,٣٢٠",
    label: "نقطة",
    subLabel: "النقاط المستخدمة",
    trend: "+٤٢٪",
    trendUp: true,
  },
  {
    icon: <Star />,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
    value: "١٢٤,٨٥٠",
    label: "نقطة",
    subLabel: "إجمالي النقاط المُصدَرة",
    trend: "+٤٣٪",
    trendUp: true,
  },
];

export default function BunesStates() {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
