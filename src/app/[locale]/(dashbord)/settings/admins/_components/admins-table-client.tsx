"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Admin } from "@/shared/lib/types/admins/admin";
import { Branch } from "@/shared/lib/types/branches/branch";
import AdminsTableHeader from "./admins-table-header";
import AdminStatusToggle from "./admin-status-toggle";
import AdminActions from "./admin-actions";
import AdminModal from "./admin-modal";
import { useDeleteAdmin } from "@/shared/lib/hooks/admins/use-admin-mutations";

interface AdminsTableClientProps {
  admins: Admin[];
  branches: Branch[];
}

export default function AdminsTableClient({ admins, branches }: AdminsTableClientProps) {
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
  const { mutate: deleteAdmin, isPending: deleting } = useDeleteAdmin();

  const getBranchName = (branchId?: string) => {
    if (!branchId) return "—";
    return branches.find((b) => b._id === branchId)?.nameAr ?? "—";
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (!admins.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 overflow-x-auto">
        <Table>
          <AdminsTableHeader />
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center py-16 text-gray-400">
                لا يوجد أدمنز بعد
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 overflow-x-auto">
        <Table className="min-w-[800px]">
          <AdminsTableHeader />
          <TableBody>
            {admins.map((admin, index) => (
              <TableRow
                key={admin._id}
                className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
              >
                <TableCell className="text-center text-sm text-gray-500">
                  {index + 1}
                </TableCell>

                <TableCell className="text-center font-medium">
                  {admin.name}
                </TableCell>

                <TableCell className="text-center font-mono text-sm" dir="ltr">
                  {admin.phone}
                </TableCell>

                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      admin.role === "super_admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {admin.role === "super_admin" ? "Super Admin" : "Admin"}
                  </span>
                </TableCell>

                <TableCell className="text-center text-sm">
                  {getBranchName(admin.branchId)}
                </TableCell>

                <TableCell className="text-center">
                  <AdminStatusToggle adminId={admin._id} initialActive={admin.isActive} />
                </TableCell>

                <TableCell className="text-center text-sm text-gray-500">
                  {formatDate(admin.createdAt)}
                </TableCell>

                <TableCell className="text-center">
                  <AdminActions
                    onEdit={() => setEditAdmin(admin)}
                    onDelete={() => { if (!deleting) deleteAdmin(admin._id); }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editAdmin && (
        <AdminModal
          open={!!editAdmin}
          onOpenChange={(open) => { if (!open) setEditAdmin(null); }}
          branches={branches}
          initialData={editAdmin}
        />
      )}
    </>
  );
}
