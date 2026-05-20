import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import DriversTableHeader from "./DriversTableHeader";
import DriversTableBody from "./drivers-table-body";
import Pagination from "@/shared/components/pagination";
import { getDrivers } from "@/shared/lib/services/drivers/get-drivers";
import { DriverStatus } from "@/shared/lib/types/drivers/driver";

interface Props {
  page: number;
  search?: string;
  status?: string;
}

export default async function DriversTable({ page, search, status }: Props) {
  const { pagination } = await getDrivers({
    page,
    search,
    status: status as DriverStatus | undefined,
  });

  const totalPages = Math.ceil(pagination.total / Number(pagination.limit));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 flex flex-col gap-4">
      <div className="overflow-x-auto">
        <Table className="min-w-[800px]">
          <DriversTableHeader />
          <Suspense fallback={null}>
            <DriversTableBody page={page} search={search} status={status} />
          </Suspense>
        </Table>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
