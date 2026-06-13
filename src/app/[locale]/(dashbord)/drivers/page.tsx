import DriverHeaderPage from "./_components/driver-header-page";
import DriversTable from "./_components/drivers-table";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
  }>;
}

export default async function DriversPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = params.search ?? undefined;
  const status = params.status ?? undefined;

  return (
    <main className="space-y-6">
      <DriverHeaderPage />
      <DriversTable page={page} search={search} status={status} />
    </main>
  );
}
