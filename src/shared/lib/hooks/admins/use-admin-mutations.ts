"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateAdminPayload, UpdateAdminPayload } from "../../types/admins/admin";
import { createAdmin } from "../../actions/admins/create-admin";
import { updateAdmin } from "../../actions/admins/update-admin";
import { deleteAdmin } from "../../actions/admins/delete-admin";
import { toggleAdminStatus } from "../../actions/admins/toggle-admin-status";

export function useCreateAdmin() {
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: CreateAdminPayload) => createAdmin(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("تم إضافة الأدمن بنجاح");
        router.refresh();
      } else {
        toast.error(data.message ?? "فشل إضافة الأدمن");
      }
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

export function useUpdateAdmin() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, ...payload }: UpdateAdminPayload & { id: string }) =>
      updateAdmin(id, payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("تم تعديل الأدمن بنجاح");
        router.refresh();
      } else {
        toast.error(data.message ?? "فشل تعديل الأدمن");
      }
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

export function useDeleteAdmin() {
  const router = useRouter();
  return useMutation({
    mutationFn: (id: string) => deleteAdmin(id),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("تم حذف الأدمن بنجاح");
        router.refresh();
      } else {
        toast.error(data.message ?? "فشل حذف الأدمن");
      }
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}

export function useToggleAdminStatus() {
  const router = useRouter();
  return useMutation({
    mutationFn: (id: string) => toggleAdminStatus(id),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("تم تغيير حالة الأدمن بنجاح");
        router.refresh();
      } else {
        toast.error(data.message ?? "فشل تغيير حالة الأدمن");
      }
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });
}
