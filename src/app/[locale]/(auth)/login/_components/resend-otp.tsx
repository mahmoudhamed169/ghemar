"use client"
import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"

type Props = {
  initialSeconds?: number
  onResend: () => Promise<void>
}

export default function ResendOtp({ initialSeconds = 120, onResend }: Props) {
  const t = useTranslations("login-page.otp")
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [seconds])

  const handleResend = useCallback(async () => {
    setIsResending(true)
    try {
      await onResend()
      setSeconds(initialSeconds)
    } finally {
      setIsResending(false)
    }
  }, [onResend, initialSeconds])

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  if (seconds > 0) {
    return (
      <p className="text-center text-sm text-gray-500">
        {t("resend-timer")}{" "}
        <span className="font-semibold text-[#0C6175]" dir="ltr">
          {mm}:{ss}
        </span>
      </p>
    )
  }

  return (
    <p className="text-center text-sm text-gray-500">
      {t("resend-prompt")}{" "}
      <button
        type="button"
        onClick={handleResend}
        disabled={isResending}
        className="font-semibold text-[#0C6175] underline underline-offset-2 transition hover:text-teal-700 disabled:opacity-60"
      >
        {isResending ? t("resending") : t("resend-action")}
      </button>
    </p>
  )
}