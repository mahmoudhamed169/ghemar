export interface PromoCode {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: string;
  currentUsage: number;
  maxUsagePerUser: number;
  minimumOrderValue: number;
  applicablePackages: string[];
  applicableCities: string[];
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
