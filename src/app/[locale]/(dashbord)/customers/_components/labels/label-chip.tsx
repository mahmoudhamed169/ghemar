import { cn } from "@/lib/utils";

export const LABEL_COLORS = [
  "#0C6175",
  "#16A34A",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#64748B",
];

const DEFAULT_COLOR = "#64748B";

export function formatLabelExpiry(expiresAt: string, locale: string) {
  return new Date(expiresAt).toLocaleString(locale === "ar" ? "ar-EG-u-nu-latn" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

interface Props {
  name: string;
  color?: string | null;
  className?: string;
}

export default function LabelChip({ name, color, className }: Props) {
  const c = color || DEFAULT_COLOR;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        className,
      )}
      style={{ backgroundColor: `${c}1A`, color: c }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: c }} />
      {name}
    </span>
  );
}
