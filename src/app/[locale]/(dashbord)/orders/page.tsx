import { parseOrdersSearchParams } from "@/shared/lib/utils/parse-orders-search-params";
import { getOrders } from "@/shared/lib/services/orders/get-orders";
import OrdersTable from "./_components/orders-table";

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

  const totalPages = Math.ceil(pagination.total / Number(pagination.limit));

  return (
    <OrdersTable
      orders={orders}
      page={currentPage}
      totalPages={totalPages}
    />
  );
}
