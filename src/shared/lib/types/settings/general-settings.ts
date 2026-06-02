export interface GeneralSettings {
  appName: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
  expressWashFee: number;
}

export interface GeneralSettingsResponse {
  success: boolean;
  data: GeneralSettings;
}
