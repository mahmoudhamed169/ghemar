import { PromoCode } from "./promo-codes";

/** send only what changes */
export interface UpdatePromoCodeBody {
  code?: string;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
  expiryDate?: string;
  /** stored as maxUsage by the API. null = unlimited */
  usageLimit?: number | null;
  /** empty = all cities */
  applicableCities?: string[];
}

export interface UpdatePromoCodeResponse {
  success: boolean;
  message: string;
  /** 409: another code already has this name */
  status?: number;
  data?: PromoCode;
}

export interface DeletePromoCodeResponse {
  success: boolean;
  message: string;
}
