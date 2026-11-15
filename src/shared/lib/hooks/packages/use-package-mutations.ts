import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { createPackageAction, deletePackageAction, updatePackageAction } from "../../actions/packages/package-actions";
import {
  CreatePackageBody,
  PackageMutationResponse,
  UpdatePackageBody,
} from "../../types/packages/package-mutation";

/** the actions return API failures (they can't throw a readable message) */
function unwrap(res: PackageMutationResponse) {
  if (!res.success) throw new Error(res.message);
  return res;
}

/**
 * Saving one package can change the others (turning "most requested" on turns
 * it off everywhere else), so refetch the whole list: the React Query cache and
 * the server-rendered cards.
 */
function useRefreshPackages() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["packages"] });
    router.refresh();
  };
}

export function useCreatePackage() {
  const t = useTranslations("Packages.toast");
  const refresh = useRefreshPackages();

  return useMutation({
    mutationFn: async (body: CreatePackageBody) => unwrap(await createPackageAction(body)),
    onSuccess: () => {
      toast.success(t("addSuccess"));
      refresh();
    },
    onError: (error) => {
      toast.error(error.message || t("addError"));
    },
  });
}

export function useUpdatePackage() {
  const t = useTranslations("Packages.toast");
  const refresh = useRefreshPackages();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: UpdatePackageBody }) =>
      unwrap(await updatePackageAction(id, body)),
    onSuccess: () => {
      toast.success(t("editSuccess"));
      refresh();
    },
    onError: (error) => {
      toast.error(error.message || t("editError"));
    },
  });
}

export function useDeletePackage() {
  const t = useTranslations("Packages.toast");
  const refresh = useRefreshPackages();

  return useMutation({
    mutationFn: (id: string) => deletePackageAction(id),
    onSuccess: () => {
      toast.success(t("deleteSuccess"));
      refresh();
    },
    onError: () => {
      toast.error(t("deleteError"));
    },
  });
}
