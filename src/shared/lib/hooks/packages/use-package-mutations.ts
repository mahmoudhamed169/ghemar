import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPackageAction, deletePackageAction, updatePackageAction } from "../../actions/packages/package-actions";
import { CreatePackageBody, UpdatePackageBody } from "../../types/packages/package-mutation";


export function useCreatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreatePackageBody) => createPackageAction(body),
    onSuccess: () => {
      toast.success("تم إضافة الباقة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة الباقة");
    },
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdatePackageBody }) =>
      updatePackageAction(id, body),
    onSuccess: () => {
      toast.success("تم تعديل الباقة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تعديل الباقة");
    },
  });
}

export function useDeletePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePackageAction(id),
    onSuccess: () => {
      toast.success("تم حذف الباقة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الباقة");
    },
  });
}