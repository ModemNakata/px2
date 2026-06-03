"use client"

import { useState, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    setLoading(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setLoading(false), 500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-[3px] pointer-events-none overflow-hidden">
      <div className="h-full w-full bg-pink-500/20">
        <div className="h-full w-1/4 bg-pink-500 animate-progress-bar rounded-full" />
      </div>
    </div>
  )
}
