export interface PromoCodeStatsData {
  totalPromoCodes: number;
  activePromoCodes: number;
  totalUsage: number;
  expiredPromoCodes: number;
}

export interface PromoCodeStatsResponse {
  success: boolean;
  message: string;
  data: PromoCodeStatsData;
}
