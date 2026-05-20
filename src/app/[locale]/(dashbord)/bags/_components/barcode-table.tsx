import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import BarcodeTableHeader from "./barcode-table-header";
import BarcodeTableBody from "./barcode-table-body";

export default function BarcodeTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <BarcodeTableHeader />
        <Suspense fallback={null}>
          <BarcodeTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
