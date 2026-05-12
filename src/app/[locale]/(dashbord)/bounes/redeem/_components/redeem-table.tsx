import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import RedeemTableHeader from "./redeem-table-header";
import RedeemTableBody from "./redeem-table-body";

export default function RedeemTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <RedeemTableHeader />
        <Suspense fallback={null}>
          <RedeemTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
