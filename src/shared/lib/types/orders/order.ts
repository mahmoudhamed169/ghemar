export type OrderStatus =
  | "pending"
  | "confirmed"
  | "awaiting_payment"
  | "driver_assigned"
  // Package delivery flow
  | "driver_preparing_bags"
  | "driver_on_way_to_customer"
  | "bags_delivered_and_linked"
  | "first_bag_collected"
  // Normal laundry pickup flow
  | "driver_on_way_to_pickup"
  | "driver_arrived_at_pickup"
  | "picked_up_from_customer"
  | "on_way_to_laundry"
  | "delivered_to_laundry"
  | "at_laundry"
  | "ready_for_return"
  | "driver_on_way_to_laundry_pickup"
  | "picked_from_laundry"
  | "on_way_to_customer"
  | "driver_arrived_at_customer"
  | "delivered_to_customer"
  // Terminal
  | "completed"
  | "cancelled"
  | "problem_reported";

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
