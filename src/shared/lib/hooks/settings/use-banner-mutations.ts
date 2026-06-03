import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CreateBannerInput,
  UpdateBannerInput,
} from "../../types/settings/banner";
import { createBannerAction } from "../../actions/settings/create-banner";
import { updateBannerAction } from "../../actions/settings/update-banner";
import { deleteBannerAction } from "../../actions/settings/delete-banner";

function buildFormData(input: {
  title?: string;
  link?: string;
  isActive?: boolean;
  sortOrder?: number;
  image?: File;
}): FormData {
  const fd = new FormData();
  fd.append("title", input.title ?? "");
  if (input.link !== undefined) fd.append("link", input.link);
  if (input.isActive !== undefined)
    fd.append("isActive", String(input.isActive));
  if (input.sortOrder !== undefined)
    fd.append("sortOrder", String(input.sortOrder));
  if (input.image) fd.append("image", input.image);
  return fd;
}

export function useCreateBanner() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: CreateBannerInput) =>
      createBannerAction(buildFormData(input)),
    onSuccess: () => {
      toast.success("تم إضافة البنر بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة البنر"),
  });
}

export function useUpdateBanner() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, ...rest }: UpdateBannerInput) =>
      updateBannerAction(id, buildFormData(rest)),
    onSuccess: () => {
      toast.success("تم تعديل البنر بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل البنر"),
  });
}

export function useDeleteBanner() {
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string) => deleteBannerAction(id),
    onSuccess: () => {
      toast.success("تم حذف البنر بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء حذف البنر"),
  });
}
