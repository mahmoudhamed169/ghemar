import ReportsTable from "./_components/reports-table";

interface PageProps {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    from?: string;
    to?: string;
  };
}

export default function page({ searchParams }: PageProps) {
  return <ReportsTable searchParams={searchParams} />;
}
