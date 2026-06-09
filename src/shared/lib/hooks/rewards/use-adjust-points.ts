import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adjustPointsAction } from "../../actions/rewards/adjust-points";

export function useAddPoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, points, description }: { userId: string; points: number; description: string }) =>
      adjustPointsAction({ userId, points: Math.abs(points), description }),
    onSuccess: () => {
      toast.success("تم إضافة النقاط بنجاح");
      queryClient.invalidateQueries({ queryKey: ["rewards-points"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة النقاط");
    },
  });
}

export function useDeductPoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, points, description }: { userId: string; points: number; description: string }) =>
      adjustPointsAction({ userId, points: -Math.abs(points), description }),
    onSuccess: () => {
      toast.success("تم خصم النقاط بنجاح");
      queryClient.invalidateQueries({ queryKey: ["rewards-points"] });
    },
    onError: () => {
      toast.error("حدث خطأ أثناء خصم النقاط");
    },
  });
}
