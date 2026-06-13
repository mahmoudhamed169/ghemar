import CustomersTable from "./_components/customers-table";
import CustomerHeaderPage from "./_components/customer-page-header";

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function CustomersPage({ searchParams }: Props) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentSearch = search ?? "";

  return (
    <main className="space-y-6">
      <CustomerHeaderPage />
      <CustomersTable page={currentPage} search={currentSearch} />
    </main>
  );
}
