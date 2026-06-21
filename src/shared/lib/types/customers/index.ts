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
  branchId?: string | { _id: string; name: string };
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
