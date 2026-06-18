"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";

interface AdminActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminActions({ onEdit, onDelete }: AdminActionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteConfirmed = () => {
    setConfirmOpen(false);
    onDelete();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
            <MoreVertical size={25} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-40 rounded-xl p-0 overflow-hidden">
          <DropdownMenuItem
            onClick={onEdit}
            className="justify-center cursor-pointer py-3 rounded-none text-[#000709] border-b border-[#00000014]"
          >
            تعديل
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setConfirmOpen(true)}
            className="justify-center cursor-pointer py-3 rounded-none text-red-500 focus:text-red-600"
          >
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-[380px] rounded-2xl p-6">
          <DialogHeader className="mb-2">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <DialogTitle className="text-center text-xl font-bold text-[#000709]">
              تأكيد الحذف
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-gray-500 mb-6">
            هل أنت متأكد من حذف هذا الأدمن؟ لا يمكن التراجع عن هذه العملية.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleDeleteConfirmed}
              className="flex-1 h-11 bg-red-500 hover:bg-red-600 text-white rounded-xl"
            >
              نعم، احذف
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              className="flex-1 h-11 rounded-xl"
            >
              إلغاء
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
