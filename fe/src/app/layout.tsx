import type { Metadata } from "next";
import { Suspense } from "react";
import Bpmf_Huninn from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import CookieBanner from "@/components/cookie-banner";
import NavigationProgress from "@/components/navigation-progress";
import SplashScreen from "@/components/splash-screen";

const bpmfHuninn = Bpmf_Huninn({
  src: [
    {
      path: "../../public/fonts/bpmf-huninn-v6-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bpmf-huninn",
});

export const metadata: Metadata = {
  title: "hugs.xin - Creator Platform",
  description: "Privacy-focused platform for creators and their fans. Powered by crypto.",
  icons: {
    icon: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(bpmfHuninn.variable, "dark", "h-full", "antialiased", "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}><NavigationProgress /></Suspense>
        <SplashScreen>{children}</SplashScreen>
        <CookieBanner />
      </body>
    </html>
  );
}
