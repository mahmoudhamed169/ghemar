import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CustomerLabel,
  CustomerLabelInput,
  LabelActionResult,
  LabelMembersBody,
} from "../../types/customers/labels";
import {
  addCustomerLabelMembersAction,
  createCustomerLabelAction,
  deleteCustomerLabelAction,
  getCustomerLabelsAction,
  removeCustomerLabelMembersAction,
  updateCustomerLabelAction,
} from "../../actions/customers/labels";

export const CUSTOMER_LABELS_KEY = ["customer-labels"];

/** thrown by the label hooks — `status` is 404 when the label was deleted or has expired */
export class LabelError extends Error {
  status: number;
  constructor(message: string | undefined, status: number) {
    super(message ?? "");
    this.status = status;
  }
}

async function unwrap<T>(call: Promise<LabelActionResult<T>>): Promise<T | undefined> {
  const result = await call;
  if (!result.success) throw new LabelError(result.message, result.status);
  return result.data;
}

export function useCustomerLabels(enabled = true) {
  return useQuery<CustomerLabel[]>({
    queryKey: CUSTOMER_LABELS_KEY,
    queryFn: async () => (await unwrap(getCustomerLabelsAction())) ?? [],
    enabled,
    staleTime: 1000 * 30,
  });
}

// every label mutation refreshes the list, on failure too: a 404 means the
// label expired and has to disappear from the pickers
function useLabelMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSettled: () => queryClient.invalidateQueries({ queryKey: CUSTOMER_LABELS_KEY }),
  });
}

export function useSaveCustomerLabel() {
  return useLabelMutation(({ id, input }: { id?: string; input: CustomerLabelInput }) =>
    unwrap(id ? updateCustomerLabelAction(id, input) : createCustomerLabelAction(input)),
  );
}

export function useDeleteCustomerLabel() {
  return useLabelMutation((id: string) => unwrap(deleteCustomerLabelAction(id)));
}

export function useCustomerLabelMembers() {
  return useLabelMutation(
    ({ id, mode, body }: { id: string; mode: "add" | "remove"; body: LabelMembersBody }) =>
      unwrap(
        mode === "add"
          ? addCustomerLabelMembersAction(id, body)
          : removeCustomerLabelMembersAction(id, body),
      ),
  );
}
