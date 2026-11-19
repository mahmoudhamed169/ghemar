/** the list populates cities / packages; older responses may hold plain ids */
export type PromoCodeRef = string | { _id: string; name?: string; code?: string };

export function refId(ref: PromoCodeRef) {
  return typeof ref === "string" ? ref : ref._id;
}

export interface PromoCode {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: string;
  /** total uses allowed; missing / null = unlimited */
  maxUsage?: number | null;
  currentUsage: number;
  maxUsagePerUser: number;
  minimumOrderValue: number;
  /** empty = all packages */
  applicablePackages: PromoCodeRef[];
  /** empty = all cities */
  applicableCities: PromoCodeRef[];
  isActive: boolean;
  createdBy: string;
  usageLog: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PromoCodesResponse {
  success: boolean;
  message: string;
  data: PromoCode[];
}
