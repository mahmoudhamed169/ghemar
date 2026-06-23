"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Pencil, Loader2, X, ChevronDown, ChevronUp } from "lucide-react";
import { CustomerDetail } from "@/shared/lib/types/customers";
import { updateCustomerAction } from "@/shared/lib/actions/customers/update-customer";
import { useCities } from "@/shared/lib/hooks/cities/use-cities";

interface Props {
  customer: CustomerDetail;
  customerId: string;
}

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().or(z.literal("")),
  preferredLanguage: z.enum(["ar", "en"]),
  cityId: z.string().optional(),
  isActive: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function CustomerEditForm({ customer, customerId }: Props) {
  const t = useTranslations("customers.details");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: citiesData } = useCities();
  const cities = citiesData?.data ?? [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer.name ?? "",
      email: customer.email ?? "",
      preferredLanguage: customer.preferredLanguage,
      cityId: customer.cityId?._id ?? "",
      isActive: customer.isActive,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) =>
      updateCustomerAction(customerId, {
        name: data.name,
        email: data.email || undefined,
        preferredLanguage: data.preferredLanguage,
        cityId: data.cityId || undefined,
        isActive: data.isActive,
      }),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(t("saveSuccess"));
        queryClient.invalidateQueries({ queryKey: ["customer", customerId] });
        setOpen(false);
      } else {
        toast.error(result.message ?? t("saveError"));
      }
    },
    onError: () => toast.error(t("saveError")),
  });

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden" dir="rtl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition text-sm font-semibold text-[#0C6175]"
      >
        <span className="flex items-center gap-2">
          <Pencil className="w-4 h-4" />
          {t("editInfo")}
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {open && (
        <form
          onSubmit={handleSubmit((d) => mutate(d))}
          className="p-4 space-y-4 bg-white"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">{t("name")}</label>
              <input
                {...register("name")}
                type="text"
                dir="rtl"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">{t("email")}</label>
              <input
                {...register("email")}
                type="email"
                dir="ltr"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Preferred Language */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">{t("language")}</label>
              <select
                {...register("preferredLanguage")}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
              >
                <option value="ar">{t("langAr")}</option>
                <option value="en">{t("langEn")}</option>
              </select>
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">{t("city")}</label>
              <select
                {...register("cityId")}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
              >
                <option value="">{t("selectCity")}</option>
                {cities.map((c: { _id: string; name: string }) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* isActive */}
          <div className="flex items-center gap-3 pt-1">
            <label className="text-sm font-medium text-gray-700">{t("status")}</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                {...register("isActive")}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#0C6175] transition-colors" />
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:-translate-x-5" />
            </label>
            <span className="text-sm text-gray-500">
              {t("activeLabel")}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-[#0C6175] hover:bg-[#0a5464] text-white text-sm font-medium px-6 py-2.5 rounded-xl transition disabled:opacity-60"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("save")}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
            >
              <X className="w-3.5 h-3.5" />
              {t("cancel")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
