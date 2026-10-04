import { useCallback } from "react";
import { useTranslations } from "next-intl";

/**
 * Resolves a sorted item's `itemType` to a label. Orders sorted before the
 * piece-type list changed may hold keys from the old list (or raw text), so
 * fall back to the legacy labels and finally to the stored value itself.
 */
export function usePieceTypeLabel() {
  const t = useTranslations("piece_types");
  const tLegacy = useTranslations("piece_types_legacy");

  return useCallback(
    (itemType: string) => {
      if (t.has(itemType as Parameters<typeof t>[0])) {
        return t(itemType as Parameters<typeof t>[0]);
      }
      if (tLegacy.has(itemType as Parameters<typeof tLegacy>[0])) {
        return tLegacy(itemType as Parameters<typeof tLegacy>[0]);
      }
      return itemType;
    },
    [t, tLegacy],
  );
}
