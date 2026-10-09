"use client";

import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useRealtimeNotifications } from "@/shared/providers/components/realtime-notifications-provider";
import { isDeliveryEvent } from "@/shared/lib/utils/notification-events";

// automatic assignment happens a moment after the order is created, so the
// reload waits for it instead of showing the order as unassigned first
const NEW_ORDER_DELAY_MS = 2000;

/**
 * While the orders page is open, some notifications arriving over the socket
 * reload the orders quietly: same page, same scroll position, no toast.
 *  - a delivery-slot alert → right away
 *  - a new order → after a short wait, so its auto-assigned driver shows up
 */
export default function OrdersLiveRefresher() {
  const router = useRouter();
  const { liveNotifications } = useRealtimeNotifications();
  const [, startTransition] = useTransition();
  // notifications already on the list when the page opened are not news
  const handledRef = useRef<Set<string> | null>(null);
  const delayedRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (handledRef.current === null) {
      handledRef.current = new Set(liveNotifications.map((item) => item._id));
      return;
    }
    const handled = handledRef.current;
    const fresh = liveNotifications.filter((item) => !handled.has(item._id));
    if (!fresh.length) return;
    fresh.forEach((item) => handled.add(item._id));

    if (fresh.some((item) => isDeliveryEvent(item.data?.event))) {
      startTransition(() => router.refresh());
    }
    if (fresh.some((item) => item.type === "new_order")) {
      // several orders in a row share one reload
      clearTimeout(delayedRef.current);
      delayedRef.current = setTimeout(() => {
        startTransition(() => router.refresh());
      }, NEW_ORDER_DELAY_MS);
    }
  }, [liveNotifications, router]);

  useEffect(() => () => clearTimeout(delayedRef.current), []);

  return null;
}
