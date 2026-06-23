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

export interface DriverBranch {
  branchId: string;
  assignedAreas: string[];
}

export interface CreateDriverPayload {
  name: string;
  phone: string;
  cityId: string;
  vehicleType: VehicleType | "";
  vehiclePlate: string;
  nationalId: string;
  employeeId: string;
  assignedAreas: string[];
  branches: DriverBranch[];
}

export type UpdateDriverPayload = Partial<Omit<CreateDriverPayload, "vehicleType">> & {
  vehicleType?: VehicleType;
};

export interface AssignedAreaDetail {
  _id: string;
  areaCode: string;
  name?: string;
  nameAr?: string;
  cityId?: { _id: string; name: string; nameAr: string };
}

export interface Driver {
  _id: string;
  name: string;
  phone: string;
  nationalId?: string;
  employeeId?: string;
  vehicleType: VehicleType;
  vehiclePlate: string;
  cityId: City;
  assignedAreas: string[];
  assignedAreasDetails?: AssignedAreaDetail[];
  branches?: DriverBranch[];
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

/* ── Driver Detail (from /api/admin/drivers/:id) ── */

export interface DriverDetailCityArea {
  _id: string;
  name: string;
  nameAr?: string;
  code: string;
  coverageRadius?: number;
  deliveryAvailable?: boolean;
}

export interface DriverDetailCity {
  _id: string;
  name: string;
  nameAr?: string;
  areas?: DriverDetailCityArea[];
}

export interface DriverDetailBranch {
  _id: string;
  branchId: {
    _id: string;
    name: string;
    nameAr?: string;
    code?: string;
  };
  assignedAreas: string[];
  assignedAreasDetails: AssignedAreaDetail[];
}

export interface DriverLiveStats {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  activeOrders: number;
}

export interface DriverDetail extends Omit<Driver, "cityId" | "branches"> {
  cityId: DriverDetailCity;
  branches?: DriverDetailBranch[];
  liveStats?: DriverLiveStats;
}

export interface DriverDetailResponse {
  success: boolean;
  message: string;
  data: DriverDetail;
}

export interface DriversParams {
  page?: number;
  limit?: number;
  search?: string;
  cityId?: string;
  status?: DriverStatus;
  activityStatus?: DriverActivityStatus;
}