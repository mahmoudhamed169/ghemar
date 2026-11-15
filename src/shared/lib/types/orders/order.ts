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
  | "driver_arrived_at_laundry_pickup"
  | "picked_from_laundry"
  | "on_way_to_customer"
  | "driver_arrived_at_customer"
  | "delivered_to_customer"
  // Terminal
  | "completed"
  | "cancelled"
  | "problem_reported";

export type OrderType = "laundry_pickup" | "package_delivery";

export type PickupMethod = "hand_to_hand" | "leave_at_door";

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
  /** equals slotStart when the client booked a pickup slot */
  scheduledDate?: string;
  /** the slot's start time ("14:00") when the client booked a pickup slot */
  scheduledTime?: string;
  method?: PickupMethod;
  /** the booked 2-hour pickup window (ISO). Missing on orders without a booked slot */
  slotStart?: string;
  slotEnd?: string;
  /** who set the pickup window. Missing on older orders — treat as "client" */
  slotChosenBy?: "client" | "admin";
}

interface Delivery {
  address?: Address;
  scheduledDate?: string;
  scheduledTime?: string;
  method?: PickupMethod;
  deliveredBagsCount?: number;
  proofImage?: string;
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

interface Branch {
  _id: string;
  name: string;
  nameAr?: string;
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

export interface SortedItem {
  _id: string;
  itemType: string;
  count: number;
}

export interface LinkedBag {
  bagId: string;
  barcode: string;
  scannedByDriver: boolean;
  linkedByDriver: boolean;
  linkedAt?: string;
}

export interface ChosenDeliverySlot {
  start: string;
  end: string;
  chosenAt: string;
  /** missing on older orders — treat as "client" */
  chosenBy?: "client" | "admin";
}

/**
 * Where the order stands against its delivery slot. null = not in a delivery
 * stage (new, completed, cancelled, ...).
 */
export type DeliveryState = "not_chosen" | "scheduled" | "due_soon" | "due" | null;

export interface Order {
  _id: string;
  orderNumber: string;
  orderType: OrderType;
  purchaseChannel?: string;
  client: Client;
  driver?: Driver;
  cityId: City;
  branchId?: Branch;
  packageId?: Package;
  pickup: Pickup;
  delivery: Delivery;
  bagCount: number;
  firstPickupCompleted: boolean;
  status: OrderStatus;
  specialInstructions?: string;
  isExpressWash: boolean;
  expressFeeStatus?: string;
  estimatedPickupTime?: string;
  actualPickupTime?: string;
  deliveryTimeChosen?: boolean;
  chosenDeliverySlot?: ChosenDeliverySlot;
  /** computed by the API at response time — recompute on screen as time passes */
  deliveryState?: DeliveryState;
  /** the admin may set / change the delivery time, whoever chose it */
  canSetDeliveryTime?: boolean;
  /** the admin may change the pickup window (laundry orders, until the bags are collected) */
  canSetPickupTime: boolean;
  deliveryRemindersSent?: number;
  bags: LinkedBag[];
  sortedItems: SortedItem[];
  firstPickupBags: string[];
  statusHistory: StatusHistory[];
  hasBagsDifference?: boolean;
  bagsDifferenceCount?: number;
  needsBagsDelivery?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersPagination {
  page: number;
  limit: number;
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
  branchId?: string;
  /** narrows the list to one order */
  orderId?: string;
}
