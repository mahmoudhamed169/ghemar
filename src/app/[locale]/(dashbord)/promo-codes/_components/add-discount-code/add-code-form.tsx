"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

import AddCodeFields from "./add-code-fields";
import AddCodeActions from "./add-code-actions";
import { City } from "@/shared/lib/types/cities/city";
import { useCreatePromoCode } from "@/shared/lib/hooks/promocode/use-create-promo-code";
import { useCities } from "@/shared/lib/hooks/cities/use-cities";

interface AddCodeFormProps {
  onClose: () => void;
}

interface FormState {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  usageLimit: string;
  expiryDate: string;
  applicableCities: string[];
}

const INITIAL_STATE: FormState = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  usageLimit: "",
  expiryDate: "",
  applicableCities: [],
};

export default function AddCodeForm({ onClose }: AddCodeFormProps) {
  const locale = useLocale();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  const {
    data: citiesData,
    isLoading: citiesLoading,
    isError: citiesError,
  } = useCities();
  const { mutate: createPromoCode, isPending } = useCreatePromoCode();

  const cities = citiesData?.data ?? [];

  const getCityName = (city: City) =>
    locale === "ar" ? city.nameAr : city.name;

  const handleChange = (field: string, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleToggleCity = (cityId: string) => {
    setForm((prev) => ({
      ...prev,
      applicableCities: prev.applicableCities.includes(cityId)
        ? prev.applicableCities.filter((id) => id !== cityId)
        : [...prev.applicableCities, cityId],
    }));
  };

  const isValid = !!(
    form.code.trim() &&
    form.discountValue &&
    form.usageLimit &&
    form.expiryDate
  );

  const handleSave = () => {
    if (!isValid) return;

    createPromoCode(
      {
        code: form.code.trim().toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        expiryDate: new Date(form.expiryDate).toISOString(),
        usageLimit: Number(form.usageLimit),
        applicableCities: form.applicableCities,
      },
      {
        onSuccess: () => {
          setForm(INITIAL_STATE);
          onClose();
        },
      },
    );
  };

  const handleCancel = () => {
    setForm(INITIAL_STATE);
    onClose();
  };

  return (
    <div className="flex flex-col gap-6">
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

      <AddCodeActions
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isPending}
        isDisabled={!isValid}
      />
    </div>
  );
}
