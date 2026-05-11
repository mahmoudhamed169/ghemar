import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

type TrendDirection = "up" | "down";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    direction: TrendDirection;
    label?: string;
  };
  icon: LucideIcon;
  iconClassName?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  iconClassName,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "gap-4 rounded-xl border bg-card p-4 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center">
        {/* Content */}
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>

        {/* Icon */}
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
            iconClassName ?? "bg-muted",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {trend && (
        <div className="mt-5 flex items-center gap-2 text-xs">
          {/* Badge */}
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
              trend.direction === "up"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend.value}
          </span>

          {trend.label && (
            <span className="text-muted-foreground">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
}