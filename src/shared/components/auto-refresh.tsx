"use client"

import { useEffect, useState, useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw } from "lucide-react"

interface AutoRefreshProps {
  intervalMs?: number
  action?: () => Promise<void>
  showButton?: boolean
}

export default function AutoRefresh({
  intervalMs = 5000,
  action,
  showButton = false,
}: AutoRefreshProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [countdown, setCountdown] = useState(Math.floor(intervalMs / 1000))

  const doRefresh = useCallback(async () => {
    if (action) await action()
    router.refresh()
  }, [action, router])

  // auto refresh interval
  useEffect(() => {
    const id = setInterval(() => {
      const tabVisible = document.visibilityState === "visible"
      const dialogOpen = !!document.querySelector('[role="dialog"]')

      if (!tabVisible || dialogOpen) return

      startTransition(() => { doRefresh() })
      setCountdown(Math.floor(intervalMs / 1000))
    }, intervalMs)

    return () => clearInterval(id)
  }, [doRefresh, intervalMs])

  // countdown ticker
  useEffect(() => {
    if (!showButton) return
    const tick = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? Math.floor(intervalMs / 1000) : prev - 1))
    }, 1000)
    return () => clearInterval(tick)
  }, [showButton, intervalMs])

  const handleManualRefresh = () => {
    startTransition(() => { doRefresh() })
    setCountdown(Math.floor(intervalMs / 1000))
  }

  if (!showButton) return null

  return (
    <button
      onClick={handleManualRefresh}
      disabled={isPending}
      className="flex items-center gap-2 text-sm text-white bg-[#0C6175] hover:bg-[#097188] px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
      title="تحديث الطلبات"
    >
      <RefreshCw
        className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`}
      />
      <span className="tabular-nums">{isPending ? "جارٍ التحديث..." : `${countdown}ث`}</span>
    </button>
  )
}
