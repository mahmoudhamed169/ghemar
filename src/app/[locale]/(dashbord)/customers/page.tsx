import CustomersTable from "./_components/customers-table";
import CustomerHeaderPage from "./_components/customer-page-header";

interface Props {
  searchParams: Promise<{ page?: string; search?: string; branchId?: string }>;
}

export default async function CustomersPage({ searchParams }: Props) {
  const { page, search, branchId } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentSearch = search ?? "";
  const currentBranchId = branchId ?? undefined;

  return (
    <main className="space-y-6">
      <CustomerHeaderPage />
      <CustomersTable page={currentPage} search={currentSearch} branchId={currentBranchId} />
    </main>
  );
}
