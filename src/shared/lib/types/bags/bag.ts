export type BagStatus =
  | "generated"
  | "assigned"
  | "in_use"
  | "at_laundry"
  | "voucher";

export interface BagLifecycle {
  status: string;
  actor: string;
  actorModel: string;
  notes: string;
  timestamp: string;
}

export interface BagAssignedTo {
  _id: string;
  phone: string;
  name: string;
}

export interface BagDriver {
  _id: string;
  name: string;
  assignedAreasDetails: unknown[];
  id: string;
}

export interface BagOrder {
  _id: string;
  orderNumber: string;
  status: string;
  driver: BagDriver;
}

export interface Bag {
  _id: string;
  barcode: string;
  batchId: string;
  status: BagStatus;
  lifecycle: BagLifecycle[];
  previousBarcodes: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
  assignedTo?: BagAssignedTo;
  currentOrderId?: BagOrder;
  soldVia?: string;
}

export interface BagsPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface BagsResponse {
  success: boolean;
  message: string;
  data: Bag[];
  pagination: BagsPagination;
}

export interface BagsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  barcode?: string;
  dateFrom?: string;
  dateTo?: string;
  batchId?: string;
  packageId?: string;
}
