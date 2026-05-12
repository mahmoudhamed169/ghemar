import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import PointsTableHeader from "./points-table-header";
import PointsTableBody from "./points-table-body";

export default function PointsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <PointsTableHeader />
        <Suspense fallback={null}>
          <PointsTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
