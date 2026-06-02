export interface NotificationSettings {
  smsEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  driverAlerts: boolean;
  delayAlerts: boolean;
}

export interface NotificationSettingsResponse {
  success: boolean;
  data: NotificationSettings;
}
