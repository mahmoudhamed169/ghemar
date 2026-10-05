import { getNotifications } from "@/shared/lib/services/notifications/get-notifications";
import Pagination from "@/shared/components/pagination";
import NotificationsFeed from "./notifications-feed";

const LIMIT = 20;

export default async function NotificationsList({ page = 1 }: { page?: number }) {
  const { data: notifications, pagination } = await getNotifications({
    page,
    limit: LIMIT,
  });

  const total = pagination?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="flex flex-col gap-3">
      <NotificationsFeed
        notifications={notifications ?? []}
        total={total}
        page={page}
      />

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}
