import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import ReportsTableHeader from "./reports-table-header";
import ReportsTableBody from "./reports-table-body";
import Pagination from "@/shared/components/pagination";
import { getInvoices } from "@/shared/lib/services/reports/get-invoices";
import { InvoicesParams } from "@/shared/lib/types/reports/invoice";

interface SearchParams {
  page?: string;
  search?: string;
  status?: string;
  from?: string;
  to?: string;
}

interface ReportsTableProps {
  searchParams: SearchParams;
}

export default async function ReportsTable({ searchParams }: ReportsTableProps) {
  const page = Number(searchParams?.page) || 1;
  const limit = 7;
  const status =
    searchParams?.status && searchParams.status !== "all"
      ? searchParams.status
      : undefined;

  const params: InvoicesParams = {
    page,
    limit,
    search: searchParams?.search || undefined,
    status,
    fromDate: searchParams?.from || undefined,
    toDate: searchParams?.to || undefined,
  };

  const { data: invoices, pagination } = await getInvoices(params);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <ReportsTableHeader />
          <Suspense fallback={null}>
            <ReportsTableBody invoices={invoices} page={page} limit={limit} />
          </Suspense>
        </Table>
      </div>

      <Pagination currentPage={pagination.page} totalPages={pagination.pages} />
    </div>
  );
}
