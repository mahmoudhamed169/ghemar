import ReportsTable from "./_components/reports-table";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  return <ReportsTable searchParams={params} />;
}
