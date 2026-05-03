import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import CustomersTableHeader from "./customers-table-header";
import CustomersTableBody from "./customers-table-body";
// import CustomersSkeleton from "./customers-skeleton";

export default function CustomersTable() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <CustomersTableHeader />
        <Suspense fallback={null}>
          <CustomersTableBody />
        </Suspense>
      </Table>
    </div>
  );
}
