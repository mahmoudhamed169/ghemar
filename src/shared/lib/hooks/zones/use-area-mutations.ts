import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateAreaInput, UpdateAreaInput } from "../../types/zones/city";
import { createAreaAction } from "../../actions/zones/create-area";
import { updateAreaAction } from "../../actions/zones/update-area";

export function useCreateArea() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ cityId, ...body }: CreateAreaInput & { cityId: string }) =>
      createAreaAction(cityId, body),
    onSuccess: () => {
      toast.success("تم إضافة المنطقة بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة المنطقة"),
  });
}

export function useUpdateArea() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      cityId,
      areaCode,
      ...body
    }: UpdateAreaInput & { cityId: string; areaCode: string }) =>
      updateAreaAction(cityId, areaCode, body),
    onSuccess: () => {
      toast.success("تم تعديل المنطقة بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل المنطقة"),
  });
}
