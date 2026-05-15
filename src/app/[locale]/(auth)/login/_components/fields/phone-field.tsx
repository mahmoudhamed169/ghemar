"use client"
import { UseFormRegister, FieldErrors } from "react-hook-form"
import { useTranslations } from "next-intl"
import { PhoneSchema } from "@/shared/lib/schemas/login/phone.schema"

type Props = {
  register: UseFormRegister<PhoneSchema>
  errors: FieldErrors<PhoneSchema>
}

export default function PhoneField({ register, errors }: Props) {
  const t = useTranslations("login-page")

  // ترجم الـ key لو كانت key معروفة، وإلا اعرضها كما هي
  const errorMessage = errors.phone?.message
    ? errors.phone.message.startsWith("login-page.validation.")
      ? t(errors.phone.message.replace("login-page.", "") as any)
      : errors.phone.message
    : undefined

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">
        {t("phone.phone-label")}
      </label>
      <div className="flex gap-2">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 font-medium select-none whitespace-nowrap">
          🇸🇦 +966
        </div>
        <input
          {...register("phone")}
          type="tel"
          inputMode="numeric"
          placeholder={t("phone.phone-placeholder")}
          dir="ltr"
          maxLength={10}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#0C6175] focus:ring-2 focus:ring-[#0C6175]/10"
        />
      </div>
      {errorMessage && (
        <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  )
}