import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import PointsTableHeader from "./points-table-header";
import PointsTableBody from "./points-table-body";

interface Props {
  page?: number;
  search?: string;
  minPoints?: number;
  maxPoints?: number;
}

export default function PointsTable({ page, search, minPoints, maxPoints }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <PointsTableHeader />
        <Suspense fallback={null}>
          <PointsTableBody page={page} search={search} minPoints={minPoints} maxPoints={maxPoints} />
        </Suspense>
      </Table>
    </div>
  );
}
