export interface AreaDriver {
  _id: string;
  name: string;
  phone: string;
}

export interface AreaDriversResponse {
  success: boolean;
  data: AreaDriver[];
}

export interface Area {
  _id?: string;
  name: string;
  nameAr: string;
  code: string;
  coordinates?: { lat: number; lng: number };
  coverageRadius?: number;
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
  coordinates: { lat: number; lng: number };
  coverageRadius: number;
  deliveryAvailable: boolean;
  driverIds: string[];
}

export type UpdateAreaInput = Partial<CreateAreaInput>;
