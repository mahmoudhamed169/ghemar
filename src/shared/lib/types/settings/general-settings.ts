export interface GeneralSettings {
  appName: string;
  appLogo?: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
  expressWashFee: number;
  /** minutes shown to the customer in the "we'll be there in X" notification; 0 = off */
  orderArrivalMinutes: number;
}

export interface GeneralSettingsResponse {
  success: boolean;
  data: GeneralSettings;
}

export interface UpdateGeneralSettingsResult {
  success: boolean;
  message?: string;
}
