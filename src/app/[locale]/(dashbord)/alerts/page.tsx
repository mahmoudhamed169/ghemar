import { Suspense } from "react";
import NotificationsList from "./_components/notifications-list";
import NotificationsListSkeleton from "./_components/notifications-list-skeleton";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const { page } = await searchParams;
  const pageNum = Number(page) || 1;

  return (
    <Suspense fallback={<NotificationsListSkeleton />}>
      <NotificationsList page={pageNum} />
    </Suspense>
  );
}
