import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AdjustCustomerBagsInput,
  BagsAdjustmentType,
  CustomerBagsHistoryResponse,
  CustomerDetailResponse,
} from "../../types/customers";
import { adjustCustomerBagsAction } from "../../actions/customers/adjust-customer-bags";

async function fetchBagsHistory(
  id: string,
  page: number,
  limit: number,
): Promise<CustomerBagsHistoryResponse> {
  const res = await fetch(`/api/customers/${id}/bags/history?page=${page}&limit=${limit}`);
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) throw new Error(json?.message ?? "");
  return json;
}

export function useCustomerBagsHistory(id: string, page: number, limit = 20) {
  return useQuery<CustomerBagsHistoryResponse>({
    queryKey: ["customer-bags-history", id, page, limit],
    queryFn: () => fetchBagsHistory(id, page, limit),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });
}

export function useAdjustCustomerBags(customerId: string, type: BagsAdjustmentType) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: AdjustCustomerBagsInput) => {
      const result = await adjustCustomerBagsAction(customerId, type, input);
      if (!result.success) throw new Error(result.message ?? "");
      return result;
    },
    onSuccess: ({ data }) => {
      // show the new balance straight from the response
      if (data) {
        queryClient.setQueryData<CustomerDetailResponse>(
          ["customer", customerId],
          (prev) =>
            prev && {
              ...prev,
              data: {
                ...prev.data,
                user: {
                  ...prev.data.user,
                  availableBags: data.availableBags,
                  purchasedBarcodesCount:
                    data.purchasedBarcodesCount ?? prev.data.user.purchasedBarcodesCount,
                },
              },
            },
        );
      }
      queryClient.invalidateQueries({ queryKey: ["customer-bags-history", customerId] });
    },
  });
}
