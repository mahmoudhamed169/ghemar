import CustomersTable from "./_components/customers-table";

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function CustomersPage({ searchParams }: Props) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentSearch = search ?? "";

  return (
    <main className="mt-6">
      <CustomersTable page={currentPage} search={currentSearch} />
    </main>
  );
}
