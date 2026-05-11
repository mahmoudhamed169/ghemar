import {
  TicketPercent,
  BadgePercent,
  Users2,
  Ban,
} from "lucide-react";

const stats = [
  {
    label: "إجمالي الرموز",
    value: "6",
    icon: TicketPercent,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    label: "رموز نشطة",
    value: "284",
    icon: BadgePercent,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    label: "إجمالي الإستخدام",
    value: "551",
    icon: Users2,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    label: "رموز منتهية",
    value: "1",
    icon: Ban,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
];

export default function OffersStat() {
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
