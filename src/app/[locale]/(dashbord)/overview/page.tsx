import { Suspense } from "react";
import OverviewContent from "./_components/overview-content";
import OverviewSkeleton from "./_components/overview-skeleton";

export default function OverviewPage() {
  return (
    <Suspense fallback={<OverviewSkeleton />}>
      <OverviewContent />
    </Suspense>
  );
}
