// Run with: npm test   (Node's built-in runner, no extra dependency)
import { test } from "node:test";
import assert from "node:assert/strict";
import { minutesUntil, resolveDeliveryState } from "./delivery-state.ts";

const NOW = Date.parse("2026-10-09T12:00:00.000Z");
const inMinutes = (m) => new Date(NOW + m * 60 * 1000).toISOString();

test("null and not_chosen are kept as the API sent them", () => {
  assert.equal(resolveDeliveryState(null, inMinutes(10), NOW), null);
  assert.equal(resolveDeliveryState(undefined, inMinutes(10), NOW), null);
  assert.equal(resolveDeliveryState("not_chosen", undefined, NOW), "not_chosen");
});

test("state follows the time left to the slot start", () => {
  assert.equal(resolveDeliveryState("scheduled", inMinutes(61), NOW), "scheduled");
  assert.equal(resolveDeliveryState("scheduled", inMinutes(60), NOW), "due_soon");
  assert.equal(resolveDeliveryState("scheduled", inMinutes(35), NOW), "due_soon");
  assert.equal(resolveDeliveryState("due_soon", inMinutes(0), NOW), "due");
  assert.equal(resolveDeliveryState("scheduled", inMinutes(-5), NOW), "due");
});

test("a stale server state moves back when the slot was pushed later", () => {
  assert.equal(resolveDeliveryState("due", inMinutes(180), NOW), "scheduled");
});

test("a missing or invalid slot start leaves the server state alone", () => {
  assert.equal(resolveDeliveryState("due_soon", undefined, NOW), "due_soon");
  assert.equal(resolveDeliveryState("scheduled", "nope", NOW), "scheduled");
});

test("minutesUntil rounds up and never goes below one", () => {
  assert.equal(minutesUntil(inMinutes(35), NOW), 35);
  assert.equal(minutesUntil(new Date(NOW + 30 * 1000).toISOString(), NOW), 1);
  assert.equal(minutesUntil(inMinutes(-3), NOW), 1);
});
