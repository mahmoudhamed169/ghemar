export type SavingsType = "amount" | "percent";

export interface Package {
  _id: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  bagCount: number;
  expressWashCount: number;
  price: number;
  currency: string;
  availableCities: string[];
  isActive: boolean;
  isDeleted: boolean;
  sortOrder: number;
  /** shown as "most requested" in the app — the backend keeps it on one package only */
  isMostPopular?: boolean;
  /** null or 0 hides the savings badge */
  savingsValue?: number | null;
  /** "amount" (default) = in the package currency, "percent" = at most 100 */
  savingsType?: SavingsType;
  /** empty string = no free gift */
  freeGift?: string;
  freeGiftAr?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PackagesResponse {
  success: boolean;
  message: string;
  data: Package[];
}
