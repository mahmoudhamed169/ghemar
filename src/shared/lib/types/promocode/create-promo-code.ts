export interface CreatePromoCodeBody {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: string;
  usageLimit: number;
  applicablePackages: string[];
  applicableCities: string[];
}

export interface CreatePromoCodeResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    expiryDate: string;
    isActive: boolean;
  };
}
