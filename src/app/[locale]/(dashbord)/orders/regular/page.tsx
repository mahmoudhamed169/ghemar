import { parseOrdersSearchParams } from "@/shared/lib/utils/parse-orders-search-params";
import OrdersTable from "../_components/orders-table";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    isExpressWash?: string;
  }>;
}

export default async function RegularOrdersPage({ searchParams }: Props) {
  const { currentPage, currentSearch, currentStatus, currentIsExpressWash } =
    parseOrdersSearchParams(await searchParams);

  return (
    <OrdersTable
      page={currentPage}
      search={currentSearch}
      status={currentStatus}
      isExpressWash={currentIsExpressWash}
      isNewClient={false}
    />
  );
}
