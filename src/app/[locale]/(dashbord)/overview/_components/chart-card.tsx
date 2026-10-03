import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({
  title,
  subtitle,
  action,
  children,
}: ChartCardProps) {
  return (
    <div
      className="bg-white flex flex-col h-full min-w-0"
      style={{
        borderRadius: "12px",
        padding: "21px",
        border: "0.67px solid #0000001F",
        gap: "16px",
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="font-bold text-gray-900">{title}</p>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
