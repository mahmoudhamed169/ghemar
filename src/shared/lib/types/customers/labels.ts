/** a label as attached to a customer */
export interface CustomerLabelRef {
  _id: string;
  name: string;
  color: string | null;
  /** ISO datetime (UTC), or null for a permanent label */
  expiresAt: string | null;
}

export interface CustomerLabel extends CustomerLabelRef {
  membersCount: number;
}

export interface CustomerLabelInput {
  name: string;
  color?: string | null;
  /** ISO datetime (UTC), or null for a permanent label */
  expiresAt?: string | null;
}

export type BagsFilter = "one" | "two" | "finished" | "never";

export const BAGS_FILTERS: BagsFilter[] = ["one", "two", "finished", "never"];

/** the customers list filters — the same object is sent as `filter` to the label members endpoints */
export interface CustomersFilter {
  search?: string;
  branchId?: string;
  bagsFilter?: BagsFilter;
  area?: string;
  labelId?: string;
}

/** either specific customers, or every customer matching a filter ({} = all customers) */
export type LabelMembersBody = { userIds: string[] } | { filter: CustomersFilter };

export interface LabelActionResult<T = undefined> {
  success: boolean;
  status: number;
  message?: string;
  data?: T;
}
