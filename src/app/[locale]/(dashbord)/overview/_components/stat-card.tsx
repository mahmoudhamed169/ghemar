import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: string;
  badgeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  badge,
  badgeType = "positive",
  icon: Icon,
  iconColor = "text-green-500",
  iconBg = "bg-green-50",
}: StatCardProps) {
  const badgeColors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-500 bg-red-50",
    neutral: "text-green-600 bg-green-50",
  };

  return (
    <div
      className="bg-white flex flex-col"
      style={{
        height: "166px",
        borderRadius: "12px",
        padding: "21px",
        border: "0.67px solid #0000001F",
        gap: "8px",
      }}
    >
      {/* Badge + Icon */}
      <div className="flex items-start justify-between">
        {badge && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-lg ${badgeColors[badgeType]}`}
          >
            {badge}
          </span>
        )}
        <div
          className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}
        >
          <Icon size={20} className={iconColor} />
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>

      {/* Title */}
      <p className="text-sm font-medium text-gray-700">{title}</p>

      {/* Subtitle */}
      {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
    </div>
  );
}
