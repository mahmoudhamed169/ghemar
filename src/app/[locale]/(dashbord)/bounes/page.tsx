import { Suspense } from "react";
import BounesFilter from "./_components/bounes-filter";
import PointsTable from "./_components/points-table";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    minPoints?: string;
    maxPoints?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <div className="space-y-4">
      <Suspense>
        <BounesFilter />
      </Suspense>
      <PointsTable
        page={Number(params.page) || 1}
        search={params.search}
        minPoints={params.minPoints ? Number(params.minPoints) : undefined}
        maxPoints={params.maxPoints ? Number(params.maxPoints) : undefined}
      />
    </div>
  );
}
