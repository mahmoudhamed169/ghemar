"use client";

import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { Info } from "lucide-react";
import { RewardsSettings } from "@/shared/lib/types/rewards/rewards-settings";
import { useUpdateRewardsSettings } from "@/shared/lib/hooks/rewards/use-update-rewards-settings";

const schema = z.object({
  pointsPerBag: z.number().min(1),
  redeemPointsPerBag: z.number().min(1),
  minRedeemPoints: z.number().min(1),
});

type FormValues = z.infer<typeof schema>;

interface PointsRulesFormProps {
  initialData: RewardsSettings;
}

export default function PointsRulesForm({ initialData }: PointsRulesFormProps) {
  const t = useTranslations("Bounes.settings");
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const { mutate, isPending } = useUpdateRewardsSettings();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      pointsPerBag: initialData.pointsPerBag,
      redeemPointsPerBag: initialData.redeemPointsPerBag,
      minRedeemPoints: initialData.minRedeemPoints,
    },
  });

  const values = watch();

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <section dir={dir} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-8 w-full">
      <h2 className="text-xl font-bold text-start text-[#000709]">
        {t("title")}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* نقاط لكل كيس */}
          <FieldCard
            label={t("pointsPerBag")}
            emoji="🛍️"
            helper={t("helperBag", { value: values.pointsPerBag ?? 0 })}
            unit={t("unit")}
            error={!!errors.pointsPerBag}
            inputProps={register("pointsPerBag", { valueAsNumber: true })}
          />

          {/* نقاط الاستبدال لكل كيس */}
          <FieldCard
            label={t("redeemPointsPerBag")}
            emoji="📦"
            helper={t("helperRedeemBag", { value: values.redeemPointsPerBag ?? 0 })}
            unit={t("unit")}
            error={!!errors.redeemPointsPerBag}
            inputProps={register("redeemPointsPerBag", { valueAsNumber: true })}
          />

          {/* spacer */}
          <div />

          {/* الحد الأدنى للاستبدال */}
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 flex flex-col gap-3">
            <div className="flex items-center justify-start gap-1.5">
              <Info className="w-4 h-4 text-gray-400 shrink-0" />
              <div className="text-start">
                <p className="text-sm font-semibold text-[#000709]">
                  {t("minRedemption")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t("minRedemptionDesc")}
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 bg-white border rounded-lg px-4 py-3 ${
                errors.minRedeemPoints ? "border-red-400" : "border-gray-200"
              }`}
            >
              <input
                {...register("minRedeemPoints", { valueAsNumber: true })}
                type="number"
                min={1}
                dir="ltr"
                className="flex-1 text-center bg-transparent outline-none font-medium text-[#000709] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-sm text-gray-400">{t("unit")}</span>
            </div>
          </div>
        </div>

        <div className={`mt-8 flex ${dir === "rtl" ? "justify-start" : "justify-end"}`}>
          <button
            type="submit"
            disabled={isPending}
            className="px-12 py-3 bg-[#0C6175] hover:bg-[#0a5464] disabled:opacity-70 text-white font-semibold rounded-xl transition-colors min-w-[180px]"
          >
            {isPending ? "..." : t("saveChanges")}
          </button>
        </div>
      </form>
    </section>
  );
}

interface FieldCardProps {
  label: string;
  emoji: string;
  helper: string;
  unit: string;
  error: boolean;
  inputProps: UseFormRegisterReturn;
}

function FieldCard({ label, emoji, helper, unit, error, inputProps }: FieldCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-start gap-1.5">
        <span className="text-base">{emoji}</span>
        <span className="text-sm font-semibold text-[#000709]">{label}</span>
      </div>

      <div
        className={`flex items-center gap-2 bg-white border rounded-lg px-4 py-3 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      >
        <input
          {...inputProps}
          type="number"
          min={1}
          dir="ltr"
          className="flex-1 text-center bg-transparent outline-none font-semibold text-teal-600 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-md shrink-0">{unit}</span>
      </div>

      <p className="text-xs text-gray-400 text-start">{helper}</p>
    </div>
  );
}
