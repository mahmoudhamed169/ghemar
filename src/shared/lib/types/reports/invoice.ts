export type InvoiceStatus = "pending" | "completed" | "failed" | "cancelled" | string;

export interface InvoiceUser {
  _id: string;
  phone?: string;
  email?: string;
  name?: string;
}

export interface InvoicePackage {
  _id: string;
  name?: string;
  nameAr?: string;
  bagCount?: number;
  price?: number;
}

export interface Invoice {
  _id: string;
  user?: InvoiceUser;
  packageId?: InvoicePackage;
  orderId?: string;
  method?: string;
  gateway?: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  promoCodeUsed?: string | null;
  discountAmount?: number;
  activationCode?: string;
  gatewayTransactionId?: string;
  paymentUrl?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InvoicesPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface InvoicesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  invoiceId?: string;
  clientId?: string;
}

export interface InvoicesResponse {
  success: boolean;
  data: Invoice[];
  pagination: InvoicesPagination;
}

export interface InvoiceResponse {
  success: boolean;
  data: Invoice;
}

export interface InvoiceStats {
  totalRevenue: number;
  invoicesThisMonth: number;
  paidInvoices: number;
  unpaidInvoices: number;
}

export interface InvoiceStatsResponse {
  success: boolean;
  data: InvoiceStats;
}
