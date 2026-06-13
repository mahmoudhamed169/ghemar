export interface GeneralSettings {
  appName: string;
  appLogo?: string;
  supportEmail: string;
  supportPhone: string;
  currency: string;
  expressWashFee: number;
}

export interface GeneralSettingsResponse {
  success: boolean;
  data: GeneralSettings;
}
