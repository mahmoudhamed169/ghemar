"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Admin, AdminRole, UpdateAdminPayload } from "@/shared/lib/types/admins/admin";
import { Branch } from "@/shared/lib/types/branches/branch";
import { useCreateAdmin, useUpdateAdmin } from "@/shared/lib/hooks/admins/use-admin-mutations";

interface AdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branches: Branch[];
  initialData?: Admin;
}

const EMPTY_FORM = { name: "", phone: "", branchId: "", role: "admin" as AdminRole };

export default function AdminModal({
  open,
  onOpenChange,
  branches,
  initialData,
}: AdminModalProps) {
  const isEdit = !!initialData;
  const [form, setForm] = useState(EMPTY_FORM);

  const { mutate: createAdmin, isPending: creating } = useCreateAdmin();
  const { mutate: updateAdmin, isPending: updating } = useUpdateAdmin();
  const isPending = creating || updating;

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              name: initialData.name,
              phone: initialData.phone,
              branchId: initialData.branchId ?? "",
              role: initialData.role,
            }
          : EMPTY_FORM,
      );
    }
  }, [initialData, open]);

  const setField = (field: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const isSuperAdmin = form.role === "super_admin";
  const isValid =
    !!form.name.trim() &&
    !!form.phone.trim() &&
    (isSuperAdmin || !!form.branchId);

  const handleSave = () => {
    if (!isValid) return;

    if (isEdit && initialData) {
      const payload: UpdateAdminPayload & { id: string } = {
        id: initialData._id,
        name: form.name,
        phone: form.phone,
        branchId: form.branchId || undefined,
      };
      updateAdmin(payload, {
        onSuccess: (res) => { if (res.success) onOpenChange(false); },
      });
    } else {
      createAdmin(
        {
          name: form.name,
          phone: form.phone,
          role: form.role,
          branchId: form.branchId,
          permissions: [],
        },
        {
          onSuccess: (res) => {
            if (res.success) {
              setForm(EMPTY_FORM);
              onOpenChange(false);
            }
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl p-4 sm:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-[#000709] mt-2">
            {isEdit ? "تعديل الأدمن" : "إضافة أدمن جديد"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>الاسم *</Label>
            <Input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="اسم الأدمن"
              className="h-11 bg-[#F5F5F5] border-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>رقم الهاتف *</Label>
            <Input
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              placeholder="+966500000000"
              dir="ltr"
              className="h-11 bg-[#F5F5F5] border-none"
            />
          </div>

          {!isEdit && (
            <div className="flex flex-col gap-1.5">
              <Label>الدور *</Label>
              <Select
                value={form.role}
                onValueChange={(v) => {
                  setField("role", v);
                  if (v === "super_admin") setField("branchId", "");
                }}
              >
                <SelectTrigger className="h-11 bg-[#F5F5F5] border-none w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin — مدير فرع</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {!isSuperAdmin && (
            <div className="flex flex-col gap-1.5">
              <Label>الفرع *</Label>
              <Select value={form.branchId} onValueChange={(v) => setField("branchId", v)}>
                <SelectTrigger className="h-11 bg-[#F5F5F5] border-none w-full">
                  <SelectValue placeholder="اختر الفرع" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b) => (
                    <SelectItem key={b._id} value={b._id}>
                      {b.nameAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleSave}
            disabled={isPending || !isValid}
            className="flex-1 h-11 bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl"
          >
            {isPending ? "جارٍ الحفظ..." : "حفظ"}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-11 rounded-xl"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
