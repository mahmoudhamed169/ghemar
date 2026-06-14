import { Suspense } from "react";
import ZonesTable from "./_components/zones-table";

interface PageProps {
  searchParams: Promise<{ search?: string; isActive?: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;

  const isActive =
    params.isActive === "true"
      ? true
      : params.isActive === "false"
        ? false
        : undefined;

  return (
    <Suspense key={`${params.search}-${params.isActive}`}>
      <ZonesTable search={params.search} isActive={isActive} />
    </Suspense>
  );
}
