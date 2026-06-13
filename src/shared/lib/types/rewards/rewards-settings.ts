export interface RewardsSettings {
  pointsPerBag: number;
  redeemPointsPerBag: number;
  minRedeemPoints: number;
}

export interface RewardsSettingsResponse {
  success: boolean;
  data: RewardsSettings;
}
