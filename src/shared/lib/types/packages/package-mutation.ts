import { SavingsType } from "./package";

/** the optional fields shared by create and update */
export interface PackageExtrasBody {
  description?: string;
  descriptionAr?: string;
  isMostPopular?: boolean;
  /** null clears the savings */
  savingsValue?: number | null;
  savingsType?: SavingsType;
  /** empty string = no free gift */
  freeGift?: string;
  freeGiftAr?: string;
}

export interface CreatePackageBody extends PackageExtrasBody {
  name: string;
  nameAr: string;
  bagCount: number;
  price: number;
  expressWashCount: number;
  currency: string;
}

export interface UpdatePackageBody extends PackageExtrasBody {
  name: string;
  nameAr: string;
  price: number;
}

export interface PackageMutationResponse {
  success: boolean;
  message: string;
  data?: {
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
