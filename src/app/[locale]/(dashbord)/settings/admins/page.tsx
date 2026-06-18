import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { checkIsSuperAdmin } from "@/shared/lib/utils/is-super-admin";
import { getAdmins } from "@/shared/lib/services/admins/get-admins";
import { getBranches } from "@/shared/lib/services/branches/get-branches";
import AdminsHeaderPage from "./_components/admins-header-page";
import AdminsTableClient from "./_components/admins-table-client";

export default async function AdminsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);

  if (!checkIsSuperAdmin(session?.user?.role, (session?.user as any)?.phone)) {
    redirect(`/${locale}/unauthorized`);
  }

  const [adminsRes, branchesRes] = await Promise.all([
    getAdmins(),
    getBranches(),
  ]);

  const admins = adminsRes.data ?? [];
  const branches = branchesRes.data ?? [];

  return (
    <main className="space-y-4 lg:space-y-6">
      <AdminsHeaderPage branches={branches} />
      <AdminsTableClient admins={admins} branches={branches} />
    </main>
  );
}
