// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { compareVersions, countClientsBelow, isValidVersion } from "./app-version.ts";

test("versions compare part by part as numbers", () => {
  assert.ok(compareVersions("1.0.10", "1.0.9") > 0);
  assert.ok(compareVersions("1.0.9", "1.0.10") < 0);
  assert.ok(compareVersions("2.0.0", "1.99.99") > 0);
  assert.equal(compareVersions("1.2", "1.2.0"), 0);
  assert.equal(compareVersions("1.0.5", "1.0.5"), 0);
});

test("valid versions", () => {
  assert.ok(isValidVersion("1.2.3"));
  assert.ok(isValidVersion("10"));
  assert.ok(!isValidVersion(""));
  assert.ok(!isValidVersion("1.2."));
  assert.ok(!isValidVersion("v1.2.3"));
});

test("clients below the minimum", () => {
  const versions = [
    { version: "1.0.10", clients: 205 },
    { version: "1.0.9", clients: 35 },
    { version: "1.0.2", clients: 4 },
  ];
  assert.equal(countClientsBelow(versions, "1.0.10"), 39);
  assert.equal(countClientsBelow(versions, "1.0.9"), 4);
  assert.equal(countClientsBelow(versions, "1.0.11"), 244);
  assert.equal(countClientsBelow(versions, ""), 0);
  assert.equal(countClientsBelow(versions, "abc"), 0);
});
