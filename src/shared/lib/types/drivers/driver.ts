export type DriverStatus = "active" | "suspended" | "deactivated";
export type DriverActivityStatus = "available" | "in_order" | "offline";
export type VehicleType = "car" | "motorcycle" | "van";

interface City {
  _id: string;
  name: string;
}

interface PerformanceMetrics {
  totalDeliveries: number;
  onTimeDeliveries: number;
  onTimeRate: number;
  totalErrors: number;
  errorRate: number;
  avgRating: number;
  totalRatings: number;
}

export interface Driver {
  _id: string;
  name: string;
  phone: string;
  vehicleType: VehicleType;
  vehiclePlate: string;
  cityId: City;
  assignedAreas: string[];
  status: DriverStatus;
  activityStatus?: DriverActivityStatus;
  isOnline: boolean;
  performanceMetrics: PerformanceMetrics;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DriversPagination {
  page: string;
  limit: string;
  total: number;
}

export interface DriversResponse {
  success: boolean;
  message: string;
  data: Driver[];
  pagination: DriversPagination;
}

export interface DriversParams {
  page?: number;
  limit?: number;
  search?: string;
  cityId?: string;
  status?: DriverStatus;
  activityStatus?: DriverActivityStatus;
}