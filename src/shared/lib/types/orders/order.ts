export type OrderStatus =
  | "pending"
  | "driver_assigned"
  | "driver_on_way_to_pickup"
  | "picked_up_from_customer"
  | "in_laundry"
  | "driver_on_way_to_delivery"
  | "delivered"
  | "cancelled";

export type OrderType = "laundry_pickup" | "package_delivery";

export type PickupMethod = "hand_to_hand";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  coordinates?: Coordinates;
  label?: string;
  city?: string;
  area?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  notes?: string;
}

interface Pickup {
  address?: Address;
  scheduledDate: string;
  scheduledTime: string;
  method: PickupMethod;
}

interface Delivery {
  address?: Address;
  scheduledDate: string;
  scheduledTime: string;
  method: PickupMethod;
}

interface Client {
  _id: string;
  phone: string;
  name: string;
}

interface Driver {
  _id: string;
  phone: string;
  name: string;
}

interface City {
  _id: string;
  name: string;
}

interface Package {
  _id: string;
  name: string;
  nameAr: string;
}

interface StatusHistory {
  status: OrderStatus;
  actor: string;
  actorModel: string;
  timestamp: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  orderType: OrderType;
  client: Client;
  driver?: Driver;
  cityId: City;
  packageId?: Package;
  pickup: Pickup;
  delivery: Delivery;
  bagCount: number;
  firstPickupCompleted: boolean;
  status: OrderStatus;
  specialInstructions?: string;
  isExpressWash: boolean;
  bags: string[];
  sortedItems: string[];
  firstPickupBags: string[];
  statusHistory: StatusHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface OrdersPagination {
  page: string;
  limit: string;
  total: number;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  pagination: OrdersPagination;
}

export interface OrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
  isExpressWash?: boolean;
  dateFrom?: string;
  dateTo?: string;
  cityId?: string;
  clientId?: string;
  driverId?: string;
  isNewClient?: boolean;
}
