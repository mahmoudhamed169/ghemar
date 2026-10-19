import { CustomerLabelRef, CustomersFilter } from "./labels";

export interface CustomerAddress {
  _id: string;
  label: string;
  coordinates?: { lat: number; lng: number };
  building?: string;
  floor?: string;
  apartment?: string;
  city?: string;
  area?: string;
  street?: string;
  notes?: string;
}

export interface CustomerPackage {
  _id: string;
  name: string;
  nameAr: string;
}

export interface CustomerCity {
  _id: string;
  name: string;
}

export interface CustomersParams extends CustomersFilter {
  page?: number;
  limit?: number;
}

export interface Customer {
  _id: string;
  phone: string;
  name?: string;
  email?: string;
  preferredLanguage: "ar" | "en";
  availableBags: number;
  expressWashCredits: number;
  isActive: boolean;
  isProfileComplete: boolean;
  currentPoints: number;
  totalPointsEarned: number;
  fcmTokens: string[];
  addresses: CustomerAddress[];
  createdAt: string;
  updatedAt: string;
  cityId?: CustomerCity;
  areaCode?: string;
  currentPackage: CustomerPackage | null;
  purchasedBarcodesCount?: number;
  receivedBagsCount?: number;
  branchId?: string | { _id: string; name: string; nameAr?: string };
  labels?: CustomerLabelRef[];
}

export interface CustomerPagination {
  page: string;
  limit: string;
  total: number;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  data: Customer[];
  pagination: CustomerPagination;
}

export interface CustomerDetailBranch {
  _id: string;
  name: string;
  nameAr?: string;
  code?: string;
}

export interface CustomerDetailRecentOrder {
  _id: string;
  orderNumber: string;
  orderType: string;
  status: string;
  createdAt: string;
}

export interface CustomerDetail {
  _id: string;
  phone: string;
  name?: string;
  email?: string;
  preferredLanguage: "ar" | "en";
  availableBags: number;
  purchasedBarcodesCount: number;
  receivedBagsCount: number;
  isActive: boolean;
  isProfileComplete: boolean;
  currentPoints: number;
  totalPointsEarned: number;
  clientCode?: string;
  createdAt: string;
  updatedAt: string;
  cityId?: { _id: string; name: string };
  branchId?: CustomerDetailBranch;
  addresses: CustomerAddress[];
}

export type BagsAdjustmentType = "add" | "deduct";

export interface AdjustCustomerBagsInput {
  /** whole number from 1 to 1000; a deduction can't take the balance below 0 */
  count: number;
  reason?: string;
}

export interface AdjustCustomerBagsData {
  userId: string;
  /** set on an addition */
  addedBags?: number;
  /** set on a deduction */
  deductedBags?: number;
  availableBags: number;
  purchasedBarcodesCount: number;
  adjustmentId: string;
}

export interface AdjustCustomerBagsResult {
  success: boolean;
  message?: string;
  data?: AdjustCustomerBagsData;
}

export interface CustomerBagsHistoryItem {
  _id: string;
  /** missing on entries made before deductions existed — those are additions */
  type?: BagsAdjustmentType;
  count: number;
  reason?: string;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: string;
  admin?: { _id: string; name?: string; phone?: string } | null;
}

export interface CustomerBagsHistoryResponse {
  success: boolean;
  message: string;
  data: CustomerBagsHistoryItem[];
  pagination: { page: number; limit: number; total: number };
}

export interface CustomerDetailResponse {
  success: boolean;
  message: string;
  data: {
    user: CustomerDetail;
    recentOrders: CustomerDetailRecentOrder[];
  };
}
