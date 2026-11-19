"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { City } from "@/shared/lib/types/cities/city";
import { PromoCode, refId } from "@/shared/lib/types/promocode/promo-codes";
import { UpdatePromoCodeBody } from "@/shared/lib/types/promocode/update-promo-code";
import { useUpdatePromoCode } from "@/shared/lib/hooks/promocode/use-update-promo-code";
import { useCities } from "@/shared/lib/hooks/cities/use-cities";
import AddCodeFields from "../add-discount-code/add-code-fields";

interface EditCodeFormProps {
  promoCode: PromoCode;
  onClose: () => void;
}

interface FormState {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  /** "" = unlimited */
  usageLimit: string;
  expiryDate: string;
  applicableCities: string[];
}

function toFormState(promoCode: PromoCode): FormState {
  return {
    code: promoCode.code,
    discountType: promoCode.discountType,
    discountValue: String(promoCode.discountValue),
    usageLimit: promoCode.maxUsage ? String(promoCode.maxUsage) : "",
    expiryDate: promoCode.expiryDate ? promoCode.expiryDate.split("T")[0] : "",
    applicableCities: (promoCode.applicableCities ?? []).map(refId),
  };
}

const sameIds = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().join() === [...b].sort().join();

/** only what changed */
function buildBody(initial: FormState, form: FormState): UpdatePromoCodeBody {
  const body: UpdatePromoCodeBody = {};
  const code = form.code.trim().toUpperCase();
  if (code !== initial.code) body.code = code;
  if (form.discountType !== initial.discountType) body.discountType = form.discountType;
  if (form.discountValue !== initial.discountValue) body.discountValue = Number(form.discountValue);
  if (form.usageLimit !== initial.usageLimit) {
    // emptied = back to unlimited
    body.usageLimit = form.usageLimit ? Number(form.usageLimit) : null;
  }
  if (form.expiryDate !== initial.expiryDate) {
    body.expiryDate = new Date(form.expiryDate).toISOString();
  }
  if (!sameIds(form.applicableCities, initial.applicableCities)) {
    body.applicableCities = form.applicableCities;
  }
  return body;
}

export default function EditCodeForm({ promoCode, onClose }: EditCodeFormProps) {
  const t = useTranslations("PromoCodes.editForm");
  const locale = useLocale();

  const [initial] = useState(() => toFormState(promoCode));
  const [form, setForm] = useState<FormState>(initial);

  const { data: citiesData, isLoading: citiesLoading, isError: citiesError } = useCities();
  const cities = citiesData?.data ?? [];
  const getCityName = (city: City) => (locale === "ar" ? city.nameAr : city.name);

  const { mutate: updatePromoCode, isPending } = useUpdatePromoCode();

  const handleChange = (field: string, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleToggleCity = (cityId: string) =>
    setForm((prev) => ({
      ...prev,
      applicableCities: prev.applicableCities.includes(cityId)
        ? prev.applicableCities.filter((id) => id !== cityId)
        : [...prev.applicableCities, cityId],
    }));

  const value = Number(form.discountValue);
  const isValid =
    !!form.code.trim() &&
    !!form.discountValue &&
    value > 0 &&
    (form.discountType !== "percentage" || value <= 100) &&
    (!form.usageLimit || Number(form.usageLimit) >= 1) &&
    !!form.expiryDate;

  const body = buildBody(initial, form);
  const isDirty = Object.keys(body).length > 0;

  const handleSave = () => {
    if (!isValid || !isDirty) return;
    updatePromoCode({ id: promoCode._id, body }, { onSuccess: () => onClose() });
  };

  return (
    <div className="flex flex-col gap-5">
      <AddCodeFields
        code={form.code}
        discountType={form.discountType}
        discountValue={form.discountValue}
        usageLimit={form.usageLimit}
        expiryDate={form.expiryDate}
        applicableCities={form.applicableCities}
        cities={cities}
        citiesLoading={citiesLoading}
        citiesError={citiesError}
        getCityName={getCityName}
        onChange={handleChange}
        onToggleCity={handleToggleCity}
      />

      {form.code.trim().toUpperCase() !== initial.code && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
          {t("renameHint", { code: initial.code })}
        </p>
      )}
      <p className="text-xs text-gray-400 -mt-2">{t("usageLimitHint")}</p>

      <div className="flex gap-3 mt-1">
        <Button
          onClick={handleSave}
          disabled={isPending || !isValid || !isDirty}
          className="flex-1 h-12 bg-[#0C6175] hover:bg-[#097188] disabled:opacity-50 text-white rounded-lg text-base font-medium"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("saving")}
            </span>
          ) : (
            t("save")
          )}
        </Button>

        <Button
          onClick={onClose}
          disabled={isPending}
          variant="outline"
          className="flex-1 h-12 border border-[#0C6175] text-[#0C6175] bg-white hover:bg-[#0C6175]/5 rounded-lg text-base font-medium"
        >
          {t("cancel")}
        </Button>
      </div>
    </div>
  );
}
