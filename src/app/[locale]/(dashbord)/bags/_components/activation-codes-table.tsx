import { Table } from "@/components/ui/table";
import ActivationCodesTableHeader from "./activation-codes-table-header";
import ActivationCodesTableBody from "./activation-codes-table-body";
import Pagination from "@/shared/components/pagination";
import { getActivationCodes } from "@/shared/lib/services/bags/get-activation-codes";

interface SearchParams {
  page?: string;
}

interface ActivationCodesTableProps {
  searchParams: SearchParams;
}

export default async function ActivationCodesTable({
  searchParams,
}: ActivationCodesTableProps) {
  const page = Number(searchParams?.page) || 1;

  const { data: codes, pagination } = await getActivationCodes({
    page,
    limit: 7,
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <ActivationCodesTableHeader />
          <ActivationCodesTableBody codes={codes} />
        </Table>
      </div>

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
      />
    </div>
  );
}
