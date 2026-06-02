export interface SecuritySettings {
  twoFactorAuth: boolean;
}

export interface SecuritySettingsResponse {
  success: boolean;
  data: SecuritySettings;
}
