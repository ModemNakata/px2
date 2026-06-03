"use client"

import { useState, useEffect } from "react"

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const waitForFonts = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }
      setFontsLoaded(true)
    }
    waitForFonts()
  }, [])

  if (!fontsLoaded) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .custom-spinner {
            animation: spin 0.3s linear infinite;
          }
        `}</style>
        <div className="relative">
          <svg className="custom-spinner" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="#f6339a" strokeWidth="2" strokeDasharray="44 88" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f6339a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 17a10 10 0 0 0-20 0"/>
              <path d="M6 17a6 6 0 0 1 12 0"/>
              <path d="M10 17a2 2 0 0 1 4 0"/>
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
