import { BarChart3 } from "lucide-react";

/** overlay shown on top of a chart whose values are all zero */
export default function ChartEmpty({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-xs text-gray-500 shadow-sm ring-1 ring-gray-100">
        <BarChart3 className="w-4 h-4 text-gray-400" />
        {message}
      </div>
    </div>
  );
}
