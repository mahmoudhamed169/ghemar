
import React, { Suspense } from "react";
import CodesTableHeader from "./codes-table-header";
import CodesTableBody from "./codes-table-body";
import { Table } from "@/components/ui/table";

export default function CodesTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <CodesTableHeader />
        <Suspense fallback={null}>
          <CodesTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
