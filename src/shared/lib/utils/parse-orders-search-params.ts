import { OrderStatus } from "@/shared/lib/types/orders/order";

interface RawSearchParams {
  page?: string;
  search?: string;
  status?: string;
  isExpressWash?: string;
  branchId?: string;
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
  };
}
