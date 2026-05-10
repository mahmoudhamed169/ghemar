// _components/AddZoneModal/types.ts
// Shared type definitions for the AddZoneModal feature

export interface Driver {
  id: string;
  name: string;
}

export interface ZoneFormData {
  name: string;
  location: string;
  /** Radius in metres */
  radius: number;
  lat: number;
  lng: number;
  selectedDriverIds: string[];
}