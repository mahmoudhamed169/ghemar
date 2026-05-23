export interface PackageStatsData {
  totalPackages: number;
  activePackages: number;
  activeSubscriptions: number;
  revenue: number;
}

export interface PackageStatsResponse {
  success: boolean;
  message: string;
  data: PackageStatsData;
}
