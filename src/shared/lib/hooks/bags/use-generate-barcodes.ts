import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  generatePackageBarcodesAction,
  GeneratePackageBarcodesBody,
  generateSingleBagsAction,
  GenerateSingleBagsBody,
} from "../../actions/bags/generate-barcodes";

export function useGeneratePackageBarcodes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: GeneratePackageBarcodesBody) =>
      generatePackageBarcodesAction(body),
    onSuccess: () => {
      toast.success("تم إنشاء أكواد التفعيل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["activation-codes"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إنشاء أكواد التفعيل");
    },
  });
}

export function useGenerateSingleBags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: GenerateSingleBagsBody) =>
      generateSingleBagsAction(body),
    onSuccess: () => {
      toast.success("تم إنشاء الباركودات بنجاح");
      queryClient.invalidateQueries({ queryKey: ["bags"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إنشاء الباركودات");
    },
  });
}
