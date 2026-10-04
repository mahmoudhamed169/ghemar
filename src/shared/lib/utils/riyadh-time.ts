// Every date/time coming from the API is ISO UTC. Always display it in Saudi
// time explicitly — never the browser's or the server's time zone (the
// production server runs in UTC, which made times show 3 hours early).

export const RIYADH_TIME_ZONE = "Asia/Riyadh";

type DateInput = string | number | Date | null | undefined;

/** "ar" → "ar-SA", "en" → "en-GB"; full tags such as "en-US" pass through */
function toLocaleTag(locale: string) {
  if (locale.includes("-")) return locale;
  return locale === "ar" ? "ar-SA" : "en-GB";
}

function toDate(value: DateInput) {
  if (value === null || value === undefined || value === "") return null;
  const date = value instanceof Date ? value : new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

/** 12-hour time in Riyadh, e.g. "٥:٠٠ م" (ar) / "5:00 pm" (en). null if invalid. */
export function formatRiyadhTime(value: DateInput, locale = "ar") {
  const date = toDate(value);
  if (!date) return null;
  return new Intl.DateTimeFormat(toLocaleTag(locale), {
    timeZone: RIYADH_TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/** date in Riyadh — the day is computed after the conversion. null if invalid. */
export function formatRiyadhDate(
  value: DateInput,
  locale = "ar",
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" },
) {
  const date = toDate(value);
  if (!date) return null;
  return new Intl.DateTimeFormat(toLocaleTag(locale), {
    ...options,
    timeZone: RIYADH_TIME_ZONE,
  }).format(date);
}

/** "date — time" in Riyadh. null if invalid. */
export function formatRiyadhDateTime(
  value: DateInput,
  locale = "ar",
  dateOptions?: Intl.DateTimeFormatOptions,
) {
  const date = formatRiyadhDate(value, locale, dateOptions);
  const time = formatRiyadhTime(value, locale);
  return date && time ? `${date} — ${time}` : null;
}

/** a slot such as "٥:٠٠ م – ٧:٠٠ م". null if either end is invalid. */
export function formatRiyadhTimeRange(start: DateInput, end: DateInput, locale = "ar") {
  const from = formatRiyadhTime(start, locale);
  const to = formatRiyadhTime(end, locale);
  return from && to ? `${from} – ${to}` : null;
}
