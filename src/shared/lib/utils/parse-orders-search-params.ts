import { OrderStatus } from "@/shared/lib/types/orders/order";

interface RawSearchParams {
  page?: string;
  search?: string;
  status?: string;
  isExpressWash?: string;
  branchId?: string;
  orderId?: string;
}

export function parseOrdersSearchParams(params: RawSearchParams) {
  return {
    currentPage: Number(params.page) || 1,
    currentSearch: params.search ?? "",
    currentStatus: (params.status as OrderStatus) ?? undefined,
    currentIsExpressWash:
      params.isExpressWash === "true"
        ? true
        : params.isExpressWash === "false"
          ? false
          : undefined,
    currentBranchId: params.branchId ?? undefined,
    // a Mongo id only — anything else would make the API fail
    currentOrderId:
      params.orderId && /^[a-f\d]{24}$/i.test(params.orderId)
        ? params.orderId
        : undefined,
  };
}
