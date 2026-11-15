import { useMutation } from "@tanstack/react-query";
import { UpdateAppUpdateBody } from "../../types/settings/app-update";
import { updateAppUpdateAction } from "../../actions/settings/update-app-update";
import { refreshAppUpdateAction } from "../../actions/settings/refresh-app-update";

/**
 * Saves the changes. A 409 (minimum above the published version) is not an
 * error: the result comes back with needsConfirm so the screen can ask the
 * admin and resend with confirm: true.
 */
export function useUpdateAppUpdate() {
  return useMutation({
    mutationFn: async (body: UpdateAppUpdateBody) => {
      const result = await updateAppUpdateAction(body);
      if (!result.success && !result.needsConfirm) throw new Error(result.message ?? "");
      return result;
    },
  });
}

export function useRefreshAppUpdate() {
  return useMutation({
    mutationFn: async () => {
      const result = await refreshAppUpdateAction();
      if (!result.success || !result.data) throw new Error("");
      return result.data;
    },
  });
}
