import { parseOrdersSearchParams } from "@/shared/lib/utils/parse-orders-search-params";
import { getOrders } from "@/shared/lib/services/orders/get-orders";
import { Suspense } from "react";
import OrdersTable from "./_components/orders-table";
import OrdersStats from "./_components/orders-stats";
import OrdersFilters from "./_components/orders-filter";
import OrdersStatusFilter from "./_components/orders-status-filter";
import StatsRowSkeleton from "@/shared/components/stats/stats-row-skeleton";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    isExpressWash?: string;
    branchId?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  const { currentPage, currentSearch, currentStatus, currentIsExpressWash, currentBranchId } =
    parseOrdersSearchParams(await searchParams);

  const { data: orders, pagination } = await getOrders({
    page: currentPage,
    search: currentSearch,
    status: currentStatus,
    isExpressWash: currentIsExpressWash,
    branchId: currentBranchId,
  });

  const pageSize = Number(pagination.limit) || orders.length;
  const totalPages = Math.ceil(pagination.total / pageSize);

  // the cards break orders down by status, so they ignore the status tab
  const statsFilters = {
    search: currentSearch,
    isExpressWash: currentIsExpressWash,
    branchId: currentBranchId,
  };

  return (
    <>
      <Suspense
        key={JSON.stringify(statsFilters)}
        fallback={<StatsRowSkeleton />}
      >
        <OrdersStats {...statsFilters} />
      </Suspense>
      <OrdersFilters />
      <OrdersStatusFilter variant="unified" />
      <OrdersTable
        orders={orders}
        page={currentPage}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </>
  );
}
