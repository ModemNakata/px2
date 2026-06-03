"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const isFirstRender = useRef(true)

  // Detect navigation completion via route change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    completeNavigation()
  }, [pathname, searchParams])

  // Intercept link clicks to start the bar immediately
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a")
      if (
        anchor &&
        anchor.href &&
        !anchor.hasAttribute("download") &&
        anchor.href.startsWith(window.location.origin)
      ) {
        startNavigation()
      }
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const startNavigation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    setVisible(true)
    setProgress(25)

    let p = 25
    intervalRef.current = setInterval(() => {
      const remaining = 90 - p
      p = Math.min(90, p + Math.max(0.5, remaining / 8))
      setProgress(p)
    }, 200)
  }

  const completeNavigation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    setProgress(100)
    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 300)
  }

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-pink-500 to-pink-300 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
