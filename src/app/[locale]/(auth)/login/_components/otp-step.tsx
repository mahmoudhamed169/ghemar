"use client"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { otpSchema, OtpSchema } from "@/shared/lib/schemas/login/otp.schema"
import OtpInput from "./fields/otp-input"
import ResendOtp from "./resend-otp"
import SubmitButton from "./submit-button"

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
    // TODO: استبدل بـ API call للتحقق من OTP
    // await verifyOtp({ phone: `966${phone}`, otp: data.otp })
    await new Promise((r) => setTimeout(r, 800))
    router.push("/")
  }

  async function handleResend() {
    // TODO: استبدل بـ API call لإعادة إرسال OTP
    // await sendOtp({ phone: `966${phone}` })
    await new Promise((r) => setTimeout(r, 600))
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