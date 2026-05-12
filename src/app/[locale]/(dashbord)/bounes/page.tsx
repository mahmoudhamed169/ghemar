import { Suspense } from "react";
import BounesFilter from "./_components/bounes-filter";
import PointsTable from "./_components/points-table";

export default function Page() {
  return (
    <div className="space-y-4">
      <Suspense>
        <BounesFilter />
      </Suspense>
      <PointsTable />
    </div>
  );
}
