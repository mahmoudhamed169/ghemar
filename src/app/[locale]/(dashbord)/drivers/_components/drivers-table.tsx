import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import DriversTableHeader from "./DriversTableHeader";
import DriversTableBody from "./drivers-table-body";

export default function DriversTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <DriversTableHeader />
        <Suspense fallback={null}>
          <DriversTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
