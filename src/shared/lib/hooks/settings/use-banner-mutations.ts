import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateBannerInput,
  UpdateBannerInput,
} from "../../types/settings/banner";
import { createBannerAction } from "../../actions/settings/create-banner";
import { updateBannerAction } from "../../actions/settings/update-banner";
import { deleteBannerAction } from "../../actions/settings/delete-banner";

function buildFormData(
  input: Omit<CreateBannerInput, "image"> & { image?: File },
): FormData {
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
  return useMutation({
    mutationFn: (input: CreateBannerInput) =>
      createBannerAction(buildFormData(input)),
    onSuccess: () => toast.success("تم إضافة البنر بنجاح"),
    onError: () => toast.error("حدث خطأ أثناء إضافة البنر"),
  });
}

export function useUpdateBanner() {
  return useMutation({
    mutationFn: ({ id, ...rest }: UpdateBannerInput) =>
      updateBannerAction(id, buildFormData(rest)),
    onSuccess: () => toast.success("تم تعديل البنر بنجاح"),
    onError: () => toast.error("حدث خطأ أثناء تعديل البنر"),
  });
}

export function useDeleteBanner() {
  return useMutation({
    mutationFn: (id: string) => deleteBannerAction(id),
    onSuccess: () => toast.success("تم حذف البنر بنجاح"),
    onError: () => toast.error("حدث خطأ أثناء حذف البنر"),
  });
}
