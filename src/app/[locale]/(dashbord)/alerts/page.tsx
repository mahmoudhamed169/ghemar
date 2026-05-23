import { Suspense } from "react";
import NotificationsList from "./_components/notifications-list";
import NotificationsListSkeleton from "./_components/notifications-list-skeleton";

export default function page() {
  return (
    <Suspense fallback={<NotificationsListSkeleton />}>
      <NotificationsList />
    </Suspense>
  );
}