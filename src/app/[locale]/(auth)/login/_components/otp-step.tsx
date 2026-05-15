"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { otpSchema, OtpSchema } from "@/shared/lib/schemas/login/otp.schema"
import OtpInput from "./fields/otp-input"
import ResendOtp from "./resend-otp"
import SubmitButton from "./submit-button"
import { sendOtpAction } from "@/shared/lib/actions/auth.actions"

type Props = {
  phone: string
  onBack: () => void
}

export default function OtpStep({ phone, onBack }: Props) {
  const t = useTranslations("login-page.otp")
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  async function onSubmit(data: OtpSchema) {
    // بنكلم الـ API مرة واحدة بس عن طريق الـ signIn
    const result = await signIn("credentials", {
      phone: `+966${phone}`,
      code: data.otp,
      redirect: false,
    })

    if (result?.error) {
      toast.error("الرمز غير صحيح أو منتهي الصلاحية")
      return
    }

    toast.success("تم تسجيل الدخول بنجاح 🎉")
    router.push("/overview")
    router.refresh()
  }

  async function handleResend() {
    const result = await sendOtpAction(phone)
    if (!result.success) toast.error(result.message)
    else toast.success(result.message)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <OtpInput
            value={field.value}
            onChange={field.onChange}
            error={errors.otp?.message}
            disabled={isSubmitting}
          />
        )}
      />
      <ResendOtp onResend={handleResend} />
      <SubmitButton
        isSubmitting={isSubmitting}
        label={t("submit")}
        loadingLabel={t("submitting")}
      />
      <button
        type="button"
        onClick={onBack}
        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition"
      >
        {t("change-phone")}
      </button>
    </form>
  )
}