"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Branch } from "@/shared/lib/types/branches/branch";
import { City } from "@/shared/lib/types/zones/city";
import BranchesTableHeader from "./branches-table-header";
import BranchStatusToggle from "./branch-status-toggle";
import BranchActions from "./branch-actions";
import BranchModal from "./branch-modal";

interface BranchesTableClientProps {
  branches: Branch[];
  cities: City[];
}

export default function BranchesTableClient({ branches, cities }: BranchesTableClientProps) {
  const [editBranch, setEditBranch] = useState<Branch | null>(null);

  if (!branches.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-5 overflow-x-auto">
        <Table>
          <BranchesTableHeader />
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="text-center py-16 text-gray-400">
                لا توجد فروع بعد
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
        <Table>
          <BranchesTableHeader />
          <TableBody>
            {branches.map((branch, index) => (
              <TableRow
                key={branch._id}
                className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
              >
                <TableCell className="text-center text-sm text-gray-500">
                  {index + 1}
                </TableCell>

                <TableCell className="text-center">
                  <p className="font-medium">{branch.nameAr}</p>
                  <p className="text-xs text-gray-400">{branch.name}</p>
                </TableCell>

                <TableCell className="text-center font-mono text-sm font-medium">
                  {branch.code}
                </TableCell>

                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0C6175]/10 text-[#0C6175] text-sm font-semibold">
                    {branch.areas?.length ?? 0}
                  </span>
                </TableCell>

                <TableCell className="text-center">
                  <BranchStatusToggle branchId={branch._id} initialActive={branch.isActive} />
                </TableCell>

                <TableCell className="text-center">
                  <BranchActions onEdit={() => setEditBranch(branch)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editBranch && (
        <BranchModal
          open={!!editBranch}
          onOpenChange={(open) => { if (!open) setEditBranch(null); }}
          cities={cities}
          initialData={editBranch}
        />
      )}
    </>
  );
}
