export interface UpdatePromoCodeBody {
  discountValue: number;
  expiryDate: string;
}

export interface UpdatePromoCodeResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    discountValue: number;
    expiryDate: string;
    isActive: boolean;
  };
}
