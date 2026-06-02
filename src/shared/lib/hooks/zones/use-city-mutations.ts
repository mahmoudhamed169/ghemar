import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateCityInput, UpdateCityInput } from "../../types/zones/city";
import { createCityAction } from "../../actions/zones/create-city";
import { updateCityAction } from "../../actions/zones/update-city";
import { toggleCityStatusAction } from "../../actions/zones/toggle-city-status";

export function useCreateCity() {
  const router = useRouter();
  return useMutation({
    mutationFn: (body: CreateCityInput) => createCityAction(body),
    onSuccess: () => {
      toast.success("تم إضافة المدينة بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء إضافة المدينة"),
  });
}

export function useUpdateCity() {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateCityInput & { id: string }) =>
      updateCityAction(id, body),
    onSuccess: () => {
      toast.success("تم تعديل المدينة بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء تعديل المدينة"),
  });
}

export function useToggleCityStatus() {
  const router = useRouter();
  return useMutation({
    mutationFn: (id: string) => toggleCityStatusAction(id),
    onSuccess: () => {
      toast.success("تم تغيير حالة المدينة بنجاح");
      router.refresh();
    },
    onError: () => toast.error("حدث خطأ أثناء تغيير حالة المدينة"),
  });
}
