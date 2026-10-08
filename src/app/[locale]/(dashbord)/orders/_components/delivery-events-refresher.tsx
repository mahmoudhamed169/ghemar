"use client";

import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useRealtimeNotifications } from "@/shared/providers/components/realtime-notifications-provider";
import { isDeliveryEvent } from "@/shared/lib/utils/delivery-events";

/**
 * While the orders page is open, a delivery-slot notification arriving over the
 * socket reloads the orders quietly: same page, same scroll position, no toast.
 */
export default function DeliveryEventsRefresher() {
  const router = useRouter();
  const { liveNotifications } = useRealtimeNotifications();
  const [, startTransition] = useTransition();
  // notifications already on the list when the page opened are not news
  const handledRef = useRef<Set<string> | null>(null);

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
  }, [liveNotifications, router]);

  return null;
}
