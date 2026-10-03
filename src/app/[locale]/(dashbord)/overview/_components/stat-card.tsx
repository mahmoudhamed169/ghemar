import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, LucideIcon, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  /** signed change; the sign decides the arrow and colour */
  trend?: { value: number; text: string; caption: string };
  footer?: ReactNode;
}

function trendStyle(value: number) {
  if (value > 0) return { Icon: ArrowUpRight, className: "text-green-600 bg-green-50" };
  if (value < 0) return { Icon: ArrowDownRight, className: "text-red-500 bg-red-50" };
  return { Icon: Minus, className: "text-gray-500 bg-gray-100" };
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = "text-green-500",
  iconBg = "bg-green-50",
  trend,
  footer,
}: StatCardProps) {
  const style = trend ? trendStyle(trend.value) : null;

  return (
    <div
      className="bg-white flex flex-col"
      style={{
        minHeight: "166px",
        borderRadius: "12px",
        padding: "21px",
        border: "0.67px solid #0000001F",
        gap: "8px",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}
        >
          <Icon size={20} className={iconColor} />
        </div>
        {trend && style && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg tabular-nums ${style.className}`}
            dir="ltr"
          >
            <style.Icon className="w-3.5 h-3.5" />
            {trend.text}
          </span>
        )}
      </div>

      <p className="text-2xl font-bold text-gray-900 leading-tight tabular-nums">
        {value}
      </p>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {trend && <p className="text-xs text-gray-400">{trend.caption}</p>}
      {footer}
    </div>
  );
}
