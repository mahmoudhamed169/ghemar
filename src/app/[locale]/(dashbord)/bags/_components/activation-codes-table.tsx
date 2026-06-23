import { Table } from "@/components/ui/table";
import ActivationCodesTableHeader from "./activation-codes-table-header";
import ActivationCodesTableBody from "./activation-codes-table-body";
import ActivationCodesFilter from "./activation-codes-filter";
import Pagination from "@/shared/components/pagination";
import { getActivationCodes } from "@/shared/lib/services/bags/get-activation-codes";

interface SearchParams {
  page?:      string;
  packageId?: string;
  isUsed?:    string;
}

interface ActivationCodesTableProps {
  searchParams: SearchParams;
}

export default async function ActivationCodesTable({ searchParams }: ActivationCodesTableProps) {
  const page      = Number(searchParams?.page) || 1;
  const packageId = searchParams?.packageId || undefined;
  const isUsed    =
    searchParams?.isUsed === "true"  ? true  :
    searchParams?.isUsed === "false" ? false :
    undefined;

  const { data: codes, pagination } = await getActivationCodes({
    page,
    limit: 7,
    packageId,
    isUsed,
  });

  return (
    <div className="space-y-4">
      <ActivationCodesFilter />

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
    </div>
  );
}
