export interface OperationalSettings {
  mandatoryBarcodeScanning: boolean;
  autoAssignDrivers: boolean;
}

export interface OperationalSettingsResponse {
  success: boolean;
  data: OperationalSettings;
}
