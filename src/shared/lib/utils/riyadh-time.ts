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

// ── date/time form inputs ──
// The dashboard always works in Saudi time, whatever the admin's own time zone
// is. Saudi Arabia has no daylight saving, so the offset is a fixed +03:00.

/** an instant → the values for <input type="date"> / <input type="time"> in Riyadh */
export function toRiyadhInputValues(value: DateInput) {
  const date = toDate(value);
  if (!date) return null;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: RIYADH_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

/** "YYYY-MM-DD" + "HH:mm" typed as Riyadh time → the instant. null if invalid. */
export function riyadhInputToDate(date: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return null;
  const result = new Date(`${date}T${time}:00+03:00`);
  return isNaN(result.getTime()) ? null : result;
}
