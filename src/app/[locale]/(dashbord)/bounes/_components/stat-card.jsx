import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @param {object}          props
 * @param {React.ReactNode} props.icon          - Lucide icon element
 * @param {string}          props.iconBg        - Tailwind bg class  e.g. "bg-green-100"
 * @param {string}          props.iconColor     - Tailwind text class e.g. "text-green-600"
 * @param {string|number}   props.value         - Main metric value
 * @param {string}          props.label         - Label below value
 * @param {string}          [props.subLabel]    - Smaller label below main label
 * @param {string}          props.trend         - e.g. "+٣٪"
 * @param {boolean}         props.trendUp       - true = green, false = red
 * @param {string}          [props.compareLabel]
 */
export default function StatCard({
  icon,
  iconBg = "bg-green-100",
  iconColor = "text-green-600",
  value,
  label,
  subLabel,
  trend,
  trendUp = true,
  compareLabel = "مقارنة بالشهر الماضي",
}) {
  return (
    <Card className="flex-1 min-w-[160px]">
      <CardContent className=" flex flex-col gap-4">
        {/* Top row: trend badge + icon */}
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center",
              iconBg,
            )}
          >
            <span className={cn("text-lg [&>svg]:w-5 [&>svg]:h-5", iconColor)}>
              {icon}
            </span>
          </div>

          <Badge
            variant="secondary"
            className={cn(
              "gap-1 text-xs font-semibold px-2 py-0.5",
              trendUp
                ? "bg-green-50 text-green-600 hover:bg-green-50"
                : "bg-red-50 text-red-500 hover:bg-red-50",
            )}
          >
            {trendUp ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {trend}
          </Badge>
        </div>

        {/* Value + labels */}
        <div className="text-[#6A7282] space-y-1.5">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-foreground text-[#000709]">
              {value}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
          </div>
          {subLabel && (
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              {subLabel}
            </p>
          )}
        </div>

        {/* Compare */}
        <p className="text-xs text-muted-foreground/60 mt-3 pt-4 border-t-[0.5px] border-[#00000014]">
          {compareLabel}
        </p>
      </CardContent>
    </Card>
  );
}
