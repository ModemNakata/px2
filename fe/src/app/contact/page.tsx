import Link from "next/link"

export const metadata = {
  title: "Contact - Glosy",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 bg-black text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to Home
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="text-lg text-gray-400">We'd love to hear from you.</p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Email</h2>
            <p>
              <a href="mailto:nakatamodem@disroot.org" className="text-pink-500 hover:text-pink-400">
                nakatamodem@disroot.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
