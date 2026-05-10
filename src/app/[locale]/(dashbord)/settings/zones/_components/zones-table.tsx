import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import ZonesTableHeader from "./zones-table-header";
import ZonesTableBody from "./zones-table-body";

export default function ZonesTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <ZonesTableHeader />
        <Suspense fallback={null}>
          <ZonesTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
