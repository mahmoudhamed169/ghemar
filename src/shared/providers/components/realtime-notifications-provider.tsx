"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import { Notification } from "@/shared/lib/types/notifications/notification";
import { getUnreadNotificationsCountAction } from "@/shared/lib/actions/notifications/get-unread-notifications-count";
import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "@/shared/lib/actions/notifications/mark-notifications-read";
import { isStoredNotificationId } from "@/shared/lib/utils/notification-id";
import {
  isSoundMuted,
  playNotificationSound,
  primeNotificationSound,
  setSoundMuted,
  subscribeToSoundMuted,
} from "@/shared/lib/utils/notification-sound";

interface RealtimeNotificationsContextValue {
  /** notifications received over the socket in this session, newest first */
  liveNotifications: Notification[];
  unreadCount: number;
  isUnread: (notification: Notification) => boolean;
  markRead: (notification: Notification) => void;
  markAllRead: (visibleIds: string[]) => Promise<void>;
  soundMuted: boolean;
  toggleSoundMuted: () => void;
}

const RealtimeNotificationsContext =
  createContext<RealtimeNotificationsContextValue | null>(null);

export function useRealtimeNotifications() {
  const context = useContext(RealtimeNotificationsContext);
  if (!context) {
    throw new Error(
      "useRealtimeNotifications must be used inside RealtimeNotificationsProvider",
    );
  }
  return context;
}

export default function RealtimeNotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const adminId =
    status === "authenticated" && session?.user?.id
      ? String(session.user.id)
      : null;

  const [liveNotifications, setLiveNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const seenIdsRef = useRef<Set<string>>(new Set());

  const soundMuted = useSyncExternalStore(
    subscribeToSoundMuted,
    isSoundMuted,
    () => false,
  );

  // unlock audio on the first interaction with the page
  useEffect(() => {
    function prime() {
      primeNotificationSound();
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    }
    window.addEventListener("pointerdown", prime);
    window.addEventListener("keydown", prime);
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };
  }, []);

  // starting unread count, once the admin is logged in
  useEffect(() => {
    if (!adminId) return;
    let cancelled = false;
    getUnreadNotificationsCountAction()
      .then((count) => {
        if (!cancelled) setUnreadCount(count);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [adminId]);

  // one socket for the whole app: opens after login, closes on logout
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!adminId || !apiUrl) return;

    const socket = io(apiUrl);

    // inside "connect" so the room is re-joined after every reconnect
    socket.on("connect", () => {
      socket.emit("join:admin", adminId);
    });

    socket.on("new_notification", (payload: Notification) => {
      if (!payload || typeof payload._id !== "string") return;
      if (seenIdsRef.current.has(payload._id)) return;
      seenIdsRef.current.add(payload._id);

      setLiveNotifications((prev) => [payload, ...prev]);
      if (!payload.isRead) setUnreadCount((count) => count + 1);
      playNotificationSound();
    });

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [adminId]);

  function isUnread(notification: Notification) {
    if (notification.isRead || readIds.has(notification._id)) return false;
    // unsaved alerts only count as unread while they're live in this session
    return (
      isStoredNotificationId(notification._id) ||
      liveNotifications.some((live) => live._id === notification._id)
    );
  }

  function markRead(notification: Notification) {
    if (!isUnread(notification)) return;

    setReadIds((prev) => new Set(prev).add(notification._id));
    setUnreadCount((count) => Math.max(0, count - 1));

    if (isStoredNotificationId(notification._id)) {
      markNotificationReadAction(notification._id).catch(() => {});
    }
  }

  async function markAllRead(visibleIds: string[]) {
    await markAllNotificationsReadAction();

    setReadIds((prev) => {
      const next = new Set(prev);
      visibleIds.forEach((id) => next.add(id));
      liveNotifications.forEach((live) => next.add(live._id));
      return next;
    });
    setUnreadCount(0);
  }

  function toggleSoundMuted() {
    setSoundMuted(!soundMuted);
  }

  return (
    <RealtimeNotificationsContext.Provider
      value={{
        liveNotifications,
        unreadCount,
        isUnread,
        markRead,
        markAllRead,
        soundMuted,
        toggleSoundMuted,
      }}
    >
      {children}
    </RealtimeNotificationsContext.Provider>
  );
}
