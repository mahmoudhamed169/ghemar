import { Table } from "@/components/ui/table";
import CustomersTableHeader from "./customers-table-header";
import CustomersTableBody from "./customers-table-body";
import Pagination from "@/shared/components/pagination";
import { getCustomers } from "@/shared/lib/services/customers/get-customers";
import { CustomersFilter } from "@/shared/lib/types/customers/labels";
import { CustomersSelectionProvider, LabelsBulkBar } from "./labels/customers-selection";

interface Props {
  page: number;
  filter: CustomersFilter;
}

export default async function CustomersTable({ page, filter }: Props) {
  const { data: customers, pagination } = await getCustomers({ page, ...filter });
  const pageSize = Number(pagination.limit) || customers.length;
  const totalPages = Math.ceil(pagination.total / pageSize);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 flex flex-col gap-4">
      {/* a new page or filter starts with nothing ticked */}
      <CustomersSelectionProvider
        key={`${page}|${JSON.stringify(filter)}`}
        ids={customers.map((c) => c._id)}
      >
        <LabelsBulkBar total={pagination.total} filter={filter} />
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <CustomersTableHeader />
            <CustomersTableBody customers={customers} offset={(page - 1) * pageSize} />
          </Table>
        </div>
      </CustomersSelectionProvider>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
