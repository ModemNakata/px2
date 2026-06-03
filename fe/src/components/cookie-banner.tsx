"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

const STORAGE_KEY = "hugsx_cookie_banner_dismissed"

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== "true") {
      setShow(true)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="cookie-banner fixed bottom-0 left-0 w-full z-50 bg-[#2a2022] border-t border-pink-500/15 px-6 py-3 animate-cookie-banner-slide-up">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-6 max-md:flex-col max-md:text-center max-md:gap-3">
        <p className="text-sm text-[#cccccc] leading-relaxed m-0">
          hugs.xin uses no tracking cookies. We only use essential cookies required for
          the platform to function. By using hugs.xin, you agree to our{" "}
          <Link href="/privacy" className="text-pink-500 underline hover:text-pink-300">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={dismiss}
          className="flex-shrink-0 bg-pink-500 text-black border-none px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors duration-150 hover:bg-pink-300 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Got It
        </button>
      </div>
    </div>
  )
}
