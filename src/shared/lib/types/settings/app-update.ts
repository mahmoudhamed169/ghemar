export type AppPlatform = "android" | "ios";

export interface AppVersionUsage {
  version: string;
  clients: number;
  lastSeenAt: string;
}

export interface AppPlatformUpdate {
  /** the lowest version still allowed — older ones must update. null = check off */
  minVersion: string | null;
  /** the newest version — older ones see a dismissible prompt. null = check off */
  latestVersion: string | null;
  storeUrl: string;
  /** read live from the App Store (iOS only; always null on Android) */
  storeVersion: string | null;
  storeReleasedAt: string | null;
  /** the highest version any client reports running — Android's "published" version */
  highestClientVersion: string | null;
  trackedClients: number;
  clientsBelowMin: number;
  /** newest first */
  versions: AppVersionUsage[];
}

export interface AppUpdateText {
  forceTitle: string;
  forceTitleAr: string;
  forceMessage: string;
  forceMessageAr: string;
  optionalTitle: string;
  optionalTitleAr: string;
  optionalMessage: string;
  optionalMessageAr: string;
}

export interface AppUpdateSettings {
  android: AppPlatformUpdate;
  ios: AppPlatformUpdate;
  text: AppUpdateText;
}

export interface AppUpdateResponse {
  success: boolean;
  data: AppUpdateSettings;
}

/** "" clears a version (turns that check off) or resets the store link to the default */
export interface AppPlatformUpdateInput {
  minVersion?: string;
  latestVersion?: string;
  storeUrl?: string;
}

/** send only what changes */
export type UpdateAppUpdateBody = Partial<AppUpdateText> & {
  android?: AppPlatformUpdateInput;
  ios?: AppPlatformUpdateInput;
  /** resend with true after the admin confirms a minimum above the published version */
  confirm?: boolean;
};

export interface UpdateAppUpdateResult {
  success: boolean;
  message?: string;
  /** 409: the new minimum is above the published version — ask the admin, then resend with confirm */
  needsConfirm?: boolean;
  data?: AppUpdateSettings;
}
