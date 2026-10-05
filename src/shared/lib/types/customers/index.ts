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

export interface CustomersParams {
  page?: number;
  limit?: number;
  search?: string;
  branchId?: string;
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

export interface AddCustomerBagsInput {
  /** whole number from 1 to 1000 — additions only */
  count: number;
  reason?: string;
}

export interface AddCustomerBagsData {
  userId: string;
  addedBags: number;
  availableBags: number;
  purchasedBarcodesCount: number;
  adjustmentId: string;
}

export interface AddCustomerBagsResult {
  success: boolean;
  message?: string;
  data?: AddCustomerBagsData;
}

export interface CustomerBagsHistoryItem {
  _id: string;
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
