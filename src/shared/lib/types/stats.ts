export interface OverviewData {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  activeDrivers: number;
}

export interface OverviewResponse {
  success: boolean;
  message: string;
  data: OverviewData;
}
