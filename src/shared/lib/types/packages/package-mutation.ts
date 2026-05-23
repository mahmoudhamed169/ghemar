export interface CreatePackageBody {
  name: string;
  nameAr: string;
  bagCount: number;
  price: number;
  expressWashCount: number;
  currency: string;
}

export interface UpdatePackageBody {
  name: string;
  nameAr: string;
  price: number;
}

export interface PackageMutationResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    nameAr: string;
    price: number;
  };
}

export interface DeletePackageResponse {
  success: boolean;
  message: string;
}
