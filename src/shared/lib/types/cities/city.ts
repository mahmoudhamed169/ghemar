export interface Area {
  _id: string;
  name: string;
  nameAr: string;
  code: string;
  deliveryAvailable: boolean;
}

export interface City {
  _id: string;
  name: string;
  nameAr: string;
  code: string;
  country: string;
  timezone: string;
  currency: string;
  areas: Area[];
  operatingHours: {
    open: string;
    close: string;
  };
  minOrderLeadTimeHours: number;
  isActive: boolean;
}

export interface CitiesResponse {
  success: boolean;
  message: string;
  data: City[];
}
