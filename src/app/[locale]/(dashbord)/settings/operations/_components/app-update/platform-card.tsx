"use client";

import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, Info, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppPlatform, AppPlatformUpdate } from "@/shared/lib/types/settings/app-update";
import {
  compareVersions,
  countClientsBelow,
  isValidVersion,
} from "@/shared/lib/utils/app-version";
import { formatRiyadhDate, formatRiyadhDateTime } from "@/shared/lib/utils/riyadh-time";

export interface PlatformForm {
  minVersion: string;
  latestVersion: string;
  storeUrl: string;
}

export type PlatformErrors = Partial<
  Record<"minVersion" | "latestVersion" | "storeUrl", "invalidVersion" | "minAboveLatest" | "invalidUrl">
>;

export function toPlatformForm(info: AppPlatformUpdate): PlatformForm {
  return {
    minVersion: info.minVersion ?? "",
    latestVersion: info.latestVersion ?? "",
    storeUrl: info.storeUrl ?? "",
  };
}

/** the problems the API would answer with a 400, checked before sending */
export function validatePlatform(form: PlatformForm): PlatformErrors {
  const errors: PlatformErrors = {};
  const min = form.minVersion.trim();
  const latest = form.latestVersion.trim();
  const url = form.storeUrl.trim();
  if (min && !isValidVersion(min)) errors.minVersion = "invalidVersion";
  if (latest && !isValidVersion(latest)) errors.latestVersion = "invalidVersion";
  if (!errors.minVersion && !errors.latestVersion && min && latest && compareVersions(min, latest) > 0) {
    errors.minVersion = "minAboveLatest";
  }
  if (url && !/^https:\/\/\S+$/i.test(url)) errors.storeUrl = "invalidUrl";
  return errors;
}

/** iOS: the App Store version. Android: the highest version clients run (Google has no public API) */
export function publishedVersion(platform: AppPlatform, info: AppPlatformUpdate) {
  return platform === "ios" ? info.storeVersion : info.highestClientVersion;
}

export const INPUT_CLASS =
  "w-full px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition aria-invalid:border-red-300 aria-invalid:bg-red-50/40";

interface PlatformCardProps {
  platform: AppPlatform;
  info: AppPlatformUpdate;
  form: PlatformForm;
  errors: PlatformErrors;
  onChange: (patch: Partial<PlatformForm>) => void;
  /** iOS only: re-read the App Store now */
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function PlatformCard({
  platform,
  info,
  form,
  errors,
  onChange,
  onRefresh,
  refreshing,
}: PlatformCardProps) {
  const t = useTranslations("Settings.operations.appUpdate");
  const locale = useLocale();
  const numberLocale = locale === "ar" ? "ar-SA" : "en-US";

  const published = publishedVersion(platform, info);
  const minVersion = form.minVersion.trim();
  const minChanged = minVersion !== (info.minVersion ?? "");
  // the API's count for the saved minimum; recomputed live while it's being edited
  const clientsBelow = minChanged
    ? countClientsBelow(info.versions, minVersion)
    : info.clientsBelowMin;
  const highlightBelow = isValidVersion(minVersion) ? minVersion : null;

  const errorText = (key: keyof PlatformErrors) =>
    errors[key] ? <p className="text-xs text-red-500">{t(`errors.${errors[key]}`)}</p> : null;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#F3F4F6] bg-[#F9FAFB] p-4 sm:p-5 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-800">{t(`platforms.${platform}`)}</h3>
        <span className="text-xs text-gray-400">
          {t("trackedClients", { count: info.trackedClients })}
        </span>
      </div>

      {/* Published version */}
      <div className="rounded-xl bg-white border border-gray-100 p-3 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-gray-500">
            {platform === "ios" ? t("publishedIos") : t("publishedAndroid")}
          </span>
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 hover:underline disabled:opacity-60"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin")} />
              {t("refresh")}
            </button>
          )}
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xl font-bold text-gray-800 tabular-nums" dir="ltr">
            {published ?? "—"}
          </span>
          {platform === "ios" && info.storeReleasedAt && (
            <span className="text-xs text-gray-400">
              {t("releasedAt", {
                date: formatRiyadhDate(info.storeReleasedAt, locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) ?? "",
              })}
            </span>
          )}
        </div>
        {platform === "android" && (
          <p className="flex items-start gap-1.5 text-xs text-gray-500">
            <Info className="w-3.5 h-3.5 mt-px shrink-0" />
            {t("androidHint")}
          </p>
        )}
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">{t("minVersion")}</span>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="decimal"
              value={form.minVersion}
              placeholder="1.0.0"
              onChange={(e) => onChange({ minVersion: e.target.value })}
              aria-invalid={!!errors.minVersion}
              className={cn(INPUT_CLASS, "flex-1 min-w-0")}
              dir="ltr"
            />
            <button
              type="button"
              disabled={!published || form.minVersion.trim() === published}
              onClick={() => published && onChange({ minVersion: published })}
              className="shrink-0 px-3 rounded-xl border border-teal-500 text-teal-700 text-xs font-medium hover:bg-teal-50 transition disabled:opacity-40 disabled:hover:bg-transparent"
            >
              {t("usePublished")}
            </button>
          </div>
          {errorText("minVersion")}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">{t("latestVersion")}</span>
          <input
            type="text"
            inputMode="decimal"
            value={form.latestVersion}
            placeholder="1.0.0"
            onChange={(e) => onChange({ latestVersion: e.target.value })}
            aria-invalid={!!errors.latestVersion}
            className={INPUT_CLASS}
            dir="ltr"
          />
          {errorText("latestVersion")}
        </label>

        <p className="text-xs text-gray-400 -mt-2">{t("emptyTurnsOff")}</p>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-gray-600">{t("storeUrl")}</span>
          <input
            type="url"
            value={form.storeUrl}
            placeholder="https://"
            onChange={(e) => onChange({ storeUrl: e.target.value })}
            aria-invalid={!!errors.storeUrl}
            className={INPUT_CLASS}
            dir="ltr"
          />
          {errors.storeUrl ? errorText("storeUrl") : (
            <p className="text-xs text-gray-400">{t("storeUrlHint")}</p>
          )}
        </label>
      </div>

      {/* Impact */}
      {clientsBelow > 0 && (
        <p className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          {t("impact", { count: clientsBelow.toLocaleString(numberLocale) })}
        </p>
      )}

      {/* Versions in use */}
      <div className="flex flex-col gap-2 min-w-0">
        <span className="text-xs font-medium text-gray-600">{t("versionsTitle")}</span>
        {info.versions.length === 0 ? (
          <p className="text-sm text-gray-400 py-3 text-center bg-white rounded-xl border border-gray-100">
            {t("noVersions")}
          </p>
        ) : (
          <div className="max-h-72 overflow-auto rounded-xl border border-gray-100 bg-white">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 text-xs text-gray-500">
                <tr>
                  <th className="px-3 py-2 text-start font-medium">{t("table.version")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("table.clients")}</th>
                  <th className="px-3 py-2 text-start font-medium">{t("table.lastSeen")}</th>
                </tr>
              </thead>
              <tbody>
                {info.versions.map((v) => {
                  const isBelow =
                    !!highlightBelow &&
                    isValidVersion(v.version) &&
                    compareVersions(v.version, highlightBelow) < 0;
                  return (
                    <tr
                      key={v.version}
                      className={cn(
                        "border-t border-gray-100",
                        isBelow ? "bg-red-50 text-red-700" : "text-gray-700",
                      )}
                    >
                      <td className="px-3 py-2 font-medium tabular-nums" dir="ltr">
                        <span className="inline-flex items-center gap-1.5">
                          {v.version}
                          {isBelow && (
                            <span className="text-[10px] font-semibold rounded-full bg-red-100 px-1.5 py-0.5" dir="auto">
                              {t("table.belowMin")}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-3 py-2 tabular-nums">{v.clients.toLocaleString(numberLocale)}</td>
                      <td className="px-3 py-2 text-xs whitespace-nowrap">
                        {formatRiyadhDateTime(v.lastSeenAt, locale) ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
