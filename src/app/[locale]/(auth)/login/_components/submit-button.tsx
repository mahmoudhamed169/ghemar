type Props = {
  isSubmitting: boolean
  label?: string
  loadingLabel?: string
}

export default function SubmitButton({
  isSubmitting,
  label = "تسجيل الدخول",
  loadingLabel = "جارٍ التحقق...",
}: Props) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-xl bg-[#0C6175] py-3 text-sm font-semibold text-white transition hover:bg-teal-700 active:scale-[0.98] disabled:opacity-70"
    >
      {isSubmitting ? loadingLabel : label}
    </button>
  )
}