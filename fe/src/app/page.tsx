"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  // Check authentication on mount (non-blocking)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        })
        const data = await response.json()
        setIsLoggedIn(data.authenticated)
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsLoggedIn(false)
      } finally {
        setAuthChecked(true)
      }
    }

    checkAuth()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)
    setIsLoading(true)

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register"
      const payload = isLogin
        ? { username, password }
        : { username, password, password_confirm: passwordConfirm }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.error || "An error occurred")
        setIsLoading(false)
      } else {
        setSuccessMessage(
          isLogin ? "Signed in successfully! Redirecting..." : "Account created successfully! Redirecting..."
        )
        setUsername("")
        setPassword("")
        setPasswordConfirm("")

        // Redirect to profile after success message is shown
        setTimeout(() => {
          window.location.href = "/profile"
        }, 1500)
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.")
      console.error("Auth error:", error)
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        setIsLoggedIn(false)
        setAuthChecked(false)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoading(false)
    }
  }

  // Show loading state while checking auth to prevent flicker
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .custom-spinner {
            animation: spin 0.8s linear infinite;
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

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black text-white">
      {/* Hero Section - Left on Desktop, Top on Mobile */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 order-1">
        <div className="space-y-6 max-w-md">
          <div>
            <h2 className="text-4xl font-bold">
              Welcome to <span className="text-pink-500">hugs.xin</span>
            </h2>
            <p className="text-lg text-gray-400 mt-4">
              Privacy-focused platform for creators and their fans.
            </p>
            <p className="text-lg text-gray-400">Powered by crypto.</p>
          </div>
        </div>
      </div>

      {/* Form Section - Right on Desktop, Bottom on Mobile */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 order-2">
        <div className="w-full max-w-md">
          {isLoggedIn ? (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              </div>
              <div className="space-y-3">
                <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-black font-bold" size="lg">
                  <Link href="/profile">My Profile</Link>
                </Button>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleLogout}
                  disabled={isLoading}
                  variant="outline"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing out...
                    </>
                  ) : (
                    "Sign Out"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{isLogin ? "Welcome Back" : "Join hugs.xin"}</h1>
                <p className="text-gray-400">
                  {isLogin ? "Sign in to your account" : "Create an account"}
                </p>
              </div>

              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-400">{successMessage}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                    autoComplete="on"
                    className="bg-white/5 border-pink-500/20 text-white placeholder:text-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-white/5 border-pink-500/20 text-white placeholder:text-gray-600"
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-gray-300">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      disabled={isLoading}
                      className="bg-white/5 border-pink-500/20 text-white placeholder:text-gray-600"
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-black font-bold"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </>
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </Button>
              </form>

              <div className="text-center text-sm">
                <p className="text-gray-400">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setErrorMessage(null)
                      setSuccessMessage(null)
                    }}
                    className="text-pink-500 hover:text-pink-400 hover:underline font-medium"
                    disabled={isLoading}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Information Content Section - Full Width Below */}
      <div className="col-span-1 md:col-span-2 px-6 md:px-12 py-12 order-3">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-pink-500">Crypto-native & Privacy by design</h3>
              <p className="text-gray-400 leading-relaxed">
                Privacy-friendly platform. Minimal data retention. Just direct payments in the currency of the
                internet. Crypto adoption is accelerating across the globe, and creators deserve a platform built
                for that future, today.
              </p>
            </div>

            <div className="space-y-2 md:text-right">
              <h3 className="text-xl font-semibold text-pink-500">Real-time analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Deep insights with comprehensive statistics and analytics help you understand your audience and
                optimize your content strategy.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-pink-500">Flexible monetization</h3>
              <p className="text-gray-400 leading-relaxed">
                Subscriptions, one-time purchases, commissions. You choose how to earn. Platform takes just 5%,
                one of the lowest fees anywhere. Your audience, your terms, your money.
              </p>
            </div>

            <div className="space-y-2 md:text-right">
              <h3 className="text-xl font-semibold text-pink-500">Full customization</h3>
              <p className="text-gray-400 leading-relaxed">
                Personalize your creator page with custom styling, branding, and layouts, and use your own domain
                for a professional, trusted presence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="col-span-1 md:col-span-2 border-t border-gray-800 py-8 px-6 md:px-12 order-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 hugs.xin</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-pink-500">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-pink-500">
              Terms
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-pink-500">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
