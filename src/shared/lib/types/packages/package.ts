export interface Package {
  _id: string;
  name: string;
  nameAr: string;
  bagCount: number;
  expressWashCount: number;
  price: number;
  currency: string;
  availableCities: string[];
  isActive: boolean;
  isDeleted: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PackagesResponse {
  success: boolean;
  message: string;
  data: Package[];
}
