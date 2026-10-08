import { Suspense } from "react";
import { getSentNotifications } from "@/shared/lib/services/notifications/get-sent-notifications";
import {
  SENT_NOTIFICATION_TYPES,
  SentRecipientRole,
} from "@/shared/lib/types/notifications/sent-notification";
import RetentionNote from "./_components/retention-note";
import SentNotificationsFilters from "./_components/sent-notifications-filters";
import SentNotificationsTable from "./_components/sent-notifications-table";
import SentNotificationsSkeleton from "./_components/sent-notifications-skeleton";

const LIMIT = 20;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    recipientRole?: string;
    type?: string;
    search?: string;
  }>;
}

export default async function SentNotificationsPage({ searchParams }: PageProps) {
  const { page, recipientRole, type, search } = await searchParams;

  // unknown values are dropped instead of being sent — the API answers 400 for them
  const filters = {
    page: Math.max(Number(page) || 1, 1),
    recipientRole:
      recipientRole === "client" || recipientRole === "driver"
        ? (recipientRole as SentRecipientRole)
        : undefined,
    type: SENT_NOTIFICATION_TYPES.find((known) => known === type),
    search: search?.trim() || undefined,
  };

  // one request shared by the note and the table; not awaited here so the
  // filters stay on screen while it loads
  const response = getSentNotifications({ ...filters, limit: LIMIT });
  // a failure is thrown where the promise is awaited (→ error.tsx); this only
  // stops it from also being reported as an unhandled rejection
  response.catch(() => {});
  const key = JSON.stringify(filters);

  return (
    <>
      <Suspense
        key={`note-${key}`}
        fallback={<div className="h-5 w-72 max-w-full bg-gray-100 rounded animate-pulse" />}
      >
        <RetentionNote response={response} />
      </Suspense>

      <SentNotificationsFilters />

      <Suspense key={key} fallback={<SentNotificationsSkeleton />}>
        <SentNotificationsTable response={response} page={filters.page} />
      </Suspense>
    </>
  );
}
