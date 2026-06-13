import { parseOrdersSearchParams } from "@/shared/lib/utils/parse-orders-search-params";
import { getOrders } from "@/shared/lib/services/orders/get-orders";
import OrdersTable from "@/app/[locale]/(dashbord)/orders/_components/orders-table";
import OrdersFilters from "@/app/[locale]/(dashbord)/orders/_components/orders-filter";
import OrdersStatusFilter from "@/app/[locale]/(dashbord)/orders/_components/orders-status-filter";
import AutoRefresh from "@/shared/components/auto-refresh";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    isExpressWash?: string;
    name?: string;
  }>;
}

export default async function CustomerOrdersPage({ params, searchParams }: Props) {
  const { id: clientId } = await params;
  const resolved = await searchParams;
  const { currentPage, currentSearch, currentStatus, currentIsExpressWash } =
    parseOrdersSearchParams(resolved);

  const { data: orders, pagination } = await getOrders({
    page: currentPage,
    search: currentSearch,
    status: currentStatus,
    isExpressWash: currentIsExpressWash,
    clientId,
  });

  const totalPages = Math.ceil(pagination.total / Number(pagination.limit));

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">
        سجل طلبات العميل{resolved.name ? ` — ${decodeURIComponent(resolved.name)}` : ""}
      </h1>
      <OrdersFilters />
      <OrdersStatusFilter variant="unified" />
      <OrdersTable orders={orders} page={currentPage} totalPages={totalPages} />
      <AutoRefresh intervalMs={2000} />
    </main>
  );
}
