"use client"
import { useRef, useState, useEffect, KeyboardEvent, ClipboardEvent } from "react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"


type Props = {
  value: string
  onChange: (val: string) => void
  error?: string
  disabled?: boolean
}

const OTP_LENGTH = 6

export default function OtpInput({ value, onChange, error, disabled }: Props) {
  const t = useTranslations("login-page.validation")
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [digits, setDigits] = useState<string[]>(
    Array(OTP_LENGTH).fill("").map((_, i) => value[i] ?? "")
  )

  useEffect(() => {
    onChange(digits.join(""))
  }, [digits]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  function handleChange(index: number, char: string) {
    const digit = char.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits]
        next[index] = ""
        setDigits(next)
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
        const next = [...digits]
        next[index - 1] = ""
        setDigits(next)
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus()
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus()
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill("").map((_, i) => pasted[i] ?? "")
    setDigits(next)
    const lastIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputsRef.current[lastIndex]?.focus()
  }

  // ترجم الـ key لو كانت key معروفة، وإلا اعرضها كما هي
  const translatedError = error
    ? error.startsWith("login-page.validation.")
      ? t(error.replace("login-page.validation.", "") as any)
      : error
    : undefined

  return (
    <div className="space-y-3">
      <div className="flex gap-2 justify-center" dir="ltr">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "w-11 h-12 text-center text-lg font-semibold rounded-xl border bg-white outline-none transition",
              "focus:border-[#0C6175] focus:ring-2 focus:ring-[#0C6175]/10",
              digit
                ? "border-[#0C6175] text-[#0C6175]"
                : "border-gray-200 text-gray-900",
              translatedError && "border-red-400",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        ))}
      </div>

      {translatedError && (
        <p className="text-xs text-red-500 text-center">{translatedError}</p>
      )}
    </div>
  )
}