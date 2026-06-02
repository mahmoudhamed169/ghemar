export interface TermsSettings {
  introduction: string;
  introductionAr: string;
  serviceUsage: string;
  serviceUsageAr: string;
  userResponsibilities: string;
  userResponsibilitiesAr: string;
  cancellationPolicy: string;
  cancellationPolicyAr: string;
  privacy: string;
  privacyAr: string;
  legalLiability: string;
  legalLiabilityAr: string;
}

export interface TermsSettingsResponse {
  success: boolean;
  data: TermsSettings;
}
