import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import ZonesTableHeader from "./zones-table-header";
import ZonesTableBody from "./zones-table-body";

interface ZonesTableProps {
  search?: string;
  isActive?: boolean;
}

export default function ZonesTable({ search, isActive }: ZonesTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5">
      <Table>
        <ZonesTableHeader />
        <Suspense fallback={null}>
          <ZonesTableBody search={search} isActive={isActive} />
        </Suspense>
      </Table>
    </div>
  );
}
