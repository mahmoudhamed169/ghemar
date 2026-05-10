// zone-details-modal.types.ts

export interface ZoneDriver {
  name: string;
  phone: string;
}

export interface ZoneDetails {
  id: number;
  name: string;
  location: string;
  drivers: ZoneDriver[];
  coordinates: {
    lat: number;
    lng: number;
  };
}
