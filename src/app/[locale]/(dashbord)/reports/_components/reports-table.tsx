import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import ReportsTableHeader from "./reports-table-header";
import ReportsTableBody from "./reports-table-body";

export default function ReportsTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <ReportsTableHeader />
        <Suspense fallback={null}>
          <ReportsTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
