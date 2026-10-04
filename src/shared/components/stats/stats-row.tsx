import { ReactNode } from "react";

/** responsive grid used for the stat cards at the top of every list page */
export default function StatsRow({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
