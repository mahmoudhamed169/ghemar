import { useMutation } from "@tanstack/react-query";
import { ClosedWindowInput } from "../../types/settings/order-hours";
import { updateOrderHoursAction } from "../../actions/settings/update-order-hours";

export function useUpdateOrderHours() {
  return useMutation({
    mutationFn: async (closedWindows: ClosedWindowInput[]) => {
      const result = await updateOrderHoursAction(closedWindows);
      if (!result.success) throw new Error(result.message ?? "");
      return result;
    },
  });
}
