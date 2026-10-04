import { Table } from "@/components/ui/table";
import CustomersTableHeader from "./customers-table-header";
import CustomersTableBody from "./customers-table-body";
import Pagination from "@/shared/components/pagination";
import { getCustomers } from "@/shared/lib/services/customers/get-customers";

interface Props {
  page: number;
  search: string;
  branchId?: string;
}

export default async function CustomersTable({ page, search, branchId }: Props) {
  const { data: customers, pagination } = await getCustomers({ page, search, branchId });
  const pageSize = Number(pagination.limit) || customers.length;
  const totalPages = Math.ceil(pagination.total / pageSize);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 flex flex-col gap-4">
      <div className="overflow-x-auto">
        <Table className="min-w-[750px]">
          <CustomersTableHeader />
          <CustomersTableBody customers={customers} offset={(page - 1) * pageSize} />
        </Table>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
