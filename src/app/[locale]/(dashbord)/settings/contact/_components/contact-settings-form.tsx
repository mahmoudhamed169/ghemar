"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, Phone, AppWindow, Loader2 } from "lucide-react";
import type { ContactInfo } from "@/shared/lib/services/content/get-contact";
import { updateContactSettingsAction } from "@/shared/lib/actions/settings/update-contact-settings";

const schema = z.object({
  appName: z.string().min(1),
  supportEmail: z.string().email(),
  supportPhone: z.string().min(5),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData: ContactInfo;
}

export default function ContactSettingsForm({ initialData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      appName: initialData.appName,
      supportEmail: initialData.supportEmail,
      supportPhone: initialData.supportPhone,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => updateContactSettingsAction(data),
    onSuccess: (result) => {
      if (result.success) toast.success("تم حفظ بيانات التواصل");
      else toast.error(result.message ?? "فشل الحفظ");
    },
    onError: () => toast.error("حدث خطأ غير متوقع"),
  });

  const fields = [
    {
      key: "appName" as const,
      label: "اسم التطبيق",
      icon: AppWindow,
      type: "text",
    },
    {
      key: "supportEmail" as const,
      label: "البريد الإلكتروني للدعم",
      icon: Mail,
      type: "email",
    },
    {
      key: "supportPhone" as const,
      label: "رقم هاتف الدعم",
      icon: Phone,
      type: "tel",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      dir="rtl"
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map(({ key, label, icon: Icon, type }) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
              <Icon className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-400" />
              <input
                {...register(key)}
                type={type}
                dir={type === "email" || type === "tel" ? "ltr" : "rtl"}
                className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 transition"
              />
            </div>
            {errors[key] && (
              <p className="text-xs text-red-500">{errors[key]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-start">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-[#0C6175] hover:bg-[#0a5464] text-white text-sm font-medium px-10 py-3 rounded-xl transition disabled:opacity-60"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          حفظ التغييرات
        </button>
      </div>
    </form>
  );
}
