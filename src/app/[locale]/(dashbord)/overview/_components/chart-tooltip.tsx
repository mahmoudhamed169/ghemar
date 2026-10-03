"use client";

export interface ChartTooltipRow {
  dataKey: string;
  label: string;
  color: string;
  format: (value: number) => string;
}

interface ChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: { dataKey?: string | number; value?: number | string }[];
  rows: ChartTooltipRow[];
}

export default function ChartTooltip({
  active,
  label,
  payload,
  rows,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg bg-white px-3 py-2 text-xs shadow-[0_4px_12px_#0000001A] min-w-32">
      <p className="mb-1.5 font-semibold text-gray-900">{label}</p>
      <div className="flex flex-col gap-1">
        {rows.map((row) => {
          const item = payload.find((p) => p.dataKey === row.dataKey);
          if (!item) return null;
          return (
            <div key={row.dataKey} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-gray-500">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: row.color }}
                />
                {row.label}
              </span>
              <span className="font-semibold text-gray-800 tabular-nums">
                {row.format(Number(item.value ?? 0))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
