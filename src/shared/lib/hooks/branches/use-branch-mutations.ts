import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateBranchInput, UpdateBranchInput } from "../../types/branches/branch";
import { createBranchAction } from "../../actions/branches/create-branch";
import { updateBranchAction } from "../../actions/branches/update-branch";
import { toggleBranchStatusAction } from "../../actions/branches/toggle-branch-status";

export function useCreateBranch() {
  const router = useRouter();
  return useMutation({
    mutationFn: (body: CreateBranchInput) => createBranchAction(body),
    onSuccess: () => {
      toast.success("تم إضافة الفرع بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة الفرع"),
  });
}

export function useUpdateBranch() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateBranchInput & { id: string }) =>
      updateBranchAction(id, body),
    onSuccess: () => {
      toast.success("تم تعديل الفرع بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل الفرع"),
  });
}

export function useToggleBranchStatus() {
  const router = useRouter();
  return useMutation({
    mutationFn: (id: string) => toggleBranchStatusAction(id),
    onSuccess: () => {
      toast.success("تم تغيير حالة الفرع بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء تغيير حالة الفرع"),
  });
}
