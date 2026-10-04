// Run with: npm test   (Node's built-in runner, no extra dependency)
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formatRiyadhDate,
  formatRiyadhTime,
  formatRiyadhTimeRange,
} from "./riyadh-time.ts";

// Arabic-Indic digits → Latin, and strip bidi marks, so expectations stay readable
const normalize = (s) =>
  s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[‎‏؜]/g, "");

test("UTC times are shown in Riyadh time (UTC+3)", () => {
  assert.equal(normalize(formatRiyadhTime("2026-10-04T14:00:00.000Z", "ar")), "5:00 م");
  assert.equal(normalize(formatRiyadhTime("2026-10-04T16:00:00.000Z", "ar")), "7:00 م");
  assert.equal(normalize(formatRiyadhTime("2026-10-04T05:00:21.258Z", "ar")), "8:00 ص");
});

test("Arabic output uses Arabic-Indic digits", () => {
  assert.equal(formatRiyadhTime("2026-10-04T14:00:00.000Z", "ar").replace(/[‎‏؜]/g, ""), "٥:٠٠ م");
});

test("slot range", () => {
  assert.equal(
    normalize(formatRiyadhTimeRange("2026-10-04T14:00:00.000Z", "2026-10-04T16:00:00.000Z", "ar")),
    "5:00 م – 7:00 م",
  );
});

test("English uses am/pm", () => {
  assert.match(formatRiyadhTime("2026-10-04T14:00:00.000Z", "en-US"), /^5:00\sPM$/);
});

test("crossing midnight: 22:00 UTC is 01:00 the next day in Riyadh", () => {
  const iso = "2026-10-04T22:00:00.000Z";
  assert.equal(normalize(formatRiyadhTime(iso, "ar")), "1:00 ص");
  assert.equal(formatRiyadhDate(iso, "en-GB", { day: "2-digit", month: "2-digit" }), "05/10");
});

test("missing or invalid input returns null", () => {
  assert.equal(formatRiyadhTime(undefined), null);
  assert.equal(formatRiyadhTime(""), null);
  assert.equal(formatRiyadhTime("not a date"), null);
  assert.equal(formatRiyadhTimeRange("2026-10-04T14:00:00.000Z", null), null);
});
