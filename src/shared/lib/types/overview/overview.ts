export type OrderStatusKey = "completed" | "in_progress" | "pending" | "problem";

export interface GrowthCard {
  value: number;
  growth: number;
}

export interface DiffCard {
  value: number;
  diff: number;
}

export interface DriversCard {
  activeCount: number;
  totalCount: number;
  ratio: number;
}

export interface OverviewCards {
  totalOrders: GrowthCard;
  activeOrders: DiffCard;
  revenue: GrowthCard;
  activeDrivers: DriversCard;
}

export interface OrderStatusItem {
  status: OrderStatusKey;
  label: string;
  count: number;
  percentage: number;
}

export interface DailyTrendItem {
  date: string;
  ordersCount: number;
  revenue: number;
}

export interface PackageDistributionItem {
  packageId: string;
  name: string;
  nameEn: string;
  count: number;
}

export interface MonthlyRevenueItem {
  month: string;
  revenue: number;
}

export interface OverviewData {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  activeDrivers: number;
  cards: OverviewCards;
  orderStatusDistribution: OrderStatusItem[];
  last7DaysTrend: DailyTrendItem[];
  packageDistribution: PackageDistributionItem[];
  monthlyRevenue: MonthlyRevenueItem[];
}

export interface OverviewResponse {
  success: boolean;
  message: string;
  data: OverviewData;
}
