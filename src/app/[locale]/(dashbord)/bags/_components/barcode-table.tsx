import { Suspense } from "react";
import { Table } from "@/components/ui/table";
import BarcodeTableHeader from "./barcode-table-header";
import BarcodeTableBody from "./barcode-table-body";
import Pagination from "@/shared/components/pagination";
import { BagsParams } from "@/shared/lib/types/bags/bag";
import { getBags } from "@/shared/lib/services/bags/get-bags";

interface SearchParams {
  page?:     string;
  search?:   string;
  status?:   string;
  from?:     string;
  to?:       string;
}

interface BarcodeTableProps {
  searchParams: SearchParams;
}

export default async function BarcodeTable({ searchParams }: BarcodeTableProps) {
  const page   = Number(searchParams?.page) || 1;
  const status = searchParams?.status && searchParams.status !== "all"
    ? searchParams.status
    : undefined;

  const params: BagsParams = {
    page,
    limit:    7,
    search:   searchParams?.search   || undefined,
    status,
    dateFrom: searchParams?.from     || undefined,
    dateTo:   searchParams?.to       || undefined,
  };

  // single fetch — نمرر الداتا كاملة للـ body
  const { data: bags, pagination } = await getBags(params);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <BarcodeTableHeader />
          <Suspense fallback={null}>
            <BarcodeTableBody bags={bags} />
          </Suspense>
        </Table>
      </div>

      <Pagination
        currentPage={Number(pagination.page)}
        totalPages={pagination.pages}
      />
    </div>
  );
}