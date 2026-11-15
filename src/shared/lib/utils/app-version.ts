// App versions such as "1.0.10". Compared part by part as numbers, so
// 1.0.10 > 1.0.9 (a plain string compare gets this wrong).

/** "1.2.3" style: numbers separated by dots */
export const VERSION_PATTERN = /^\d+(\.\d+)*$/;

export function isValidVersion(value: string) {
  return VERSION_PATTERN.test(value.trim());
}

/** negative when a < b, 0 when equal, positive when a > b. Missing parts count as 0 (1.2 = 1.2.0). */
export function compareVersions(a: string, b: string) {
  const left = a.trim().split(".").map(Number);
  const right = b.trim().split(".").map(Number);
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const diff = (left[i] || 0) - (right[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

/** how many clients run a version older than minVersion. 0 when minVersion is empty or invalid. */
export function countClientsBelow(
  versions: { version: string; clients: number }[],
  minVersion: string,
) {
  if (!isValidVersion(minVersion)) return 0;
  return versions
    .filter((v) => isValidVersion(v.version) && compareVersions(v.version, minVersion) < 0)
    .reduce((sum, v) => sum + v.clients, 0);
}
