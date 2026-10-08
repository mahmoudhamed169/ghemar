// The API computes deliveryState when it answers, so it goes stale while the
// page stays open. These helpers recompute it from the slot start as time passes.

export type DeliveryStateValue = "not_chosen" | "scheduled" | "due_soon" | "due" | null;

const MINUTE_MS = 60 * 1000;
export const DUE_SOON_MS = 60 * MINUTE_MS;

/**
 * null / "not_chosen" are kept as the API sent them (they only change through
 * a server-side change). Otherwise the state follows the time left to the slot.
 */
export function resolveDeliveryState(
  serverState: DeliveryStateValue | undefined,
  slotStart: string | undefined,
  now: number,
): DeliveryStateValue {
  if (!serverState || serverState === "not_chosen") return serverState ?? null;

  const start = slotStart ? new Date(slotStart).getTime() : NaN;
  if (isNaN(start)) return serverState;

  const msLeft = start - now;
  if (msLeft <= 0) return "due";
  if (msLeft <= DUE_SOON_MS) return "due_soon";
  return "scheduled";
}

/** whole minutes left to the slot start, never below 1 */
export function minutesUntil(slotStart: string, now: number) {
  const msLeft = new Date(slotStart).getTime() - now;
  return Math.max(1, Math.ceil(msLeft / MINUTE_MS));
}
