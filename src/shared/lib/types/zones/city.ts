export interface AreaDriver {
  _id: string;
  name: string;
  phone: string;
}

export interface AreaDriversResponse {
  success: boolean;
  data: AreaDriver[];
}

/** Internal map drawing type — used only in the UI */
export type PolygonPoint = { lat: number; lng: number };

/** GeoJSON Polygon — what the backend expects/returns */
export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: [number, number][][]; // [[[lng, lat], ...closed ring]]
}

export interface Area {
  _id?: string;
  name: string;
  nameAr: string;
  code: string;
  polygon?: GeoJSONPolygon;
  deliveryAvailable: boolean;
  driverIds: string[];
}

export interface City {
  _id: string;
  name: string;
  nameAr: string;
  code: string;
  country: string;
  timezone: string;
  currency: string;
  operatingHours: { open: string; close: string };
  minOrderLeadTimeHours: number;
  isActive: boolean;
  areas?: Area[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CityStats {
  totalCities: number;
  activeCities: number;
  disabledCities: number;
  totalDrivers: number;
}

export interface CityStatsResponse {
  success: boolean;
  data: CityStats;
}

export interface CitiesResponse {
  success: boolean;
  data: City[];
}

export interface CityResponse {
  success: boolean;
  data: City;
}

export interface CreateCityInput {
  name: string;
  nameAr: string;
  code: string;
  country: string;
  timezone: string;
  currency: string;
  operatingHours: { open: string; close: string };
  minOrderLeadTimeHours: number;
  isActive: boolean;
}

export type UpdateCityInput = Partial<CreateCityInput>;

export interface CreateAreaInput {
  name: string;
  nameAr: string;
  code: string;
  polygon: PolygonPoint[]; // converted to GeoJSON inside the server action
  deliveryAvailable: boolean;
  driverIds: string[];
}

export type UpdateAreaInput = Partial<CreateAreaInput>;
