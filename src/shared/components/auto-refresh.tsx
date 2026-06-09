"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface AutoRefreshProps {
  intervalMs?: number
}

export default function AutoRefresh({ intervalMs = 5000 }: AutoRefreshProps) {
  const router = useRouter()

  useEffect(() => {
    const id = setInterval(() => {
      const tabVisible = document.visibilityState === "visible"
      const dialogOpen = !!document.querySelector('[role="dialog"]')

      const time = new Date().toLocaleTimeString("ar-SA")

      if (!tabVisible) {
        console.log(`[AutoRefresh] ${time} — skipped (tab hidden)`)
        return
      }
      if (dialogOpen) {
        console.log(`[AutoRefresh] ${time} — skipped (dialog open)`)
        return
      }

      console.log(`[AutoRefresh] ${time} — refreshing...`)
      router.refresh()
    }, intervalMs)

    console.log(`[AutoRefresh] started — interval: ${intervalMs}ms`)
    return () => {
      clearInterval(id)
      console.log("[AutoRefresh] stopped")
    }
  }, [router, intervalMs])

  return null
}
