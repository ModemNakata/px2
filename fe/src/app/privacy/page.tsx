import Link from "next/link"

export const metadata = {
  title: "Privacy Policy - Glosy",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 bg-black text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to Home
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Last updated: May 2026</p>

          <p className="leading-relaxed text-gray-300">
            Glosy is built on the belief that you deserve a platform that respects your privacy. This policy
            explains what little data we handle and how we handle it.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Data We Collect</h2>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-pink-500">Information You Provide</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Username and display name — your chosen identity on Glosy</li>
                <li>Profile information — bio, avatar, and any details you add to your creator page</li>
                <li>
                  Cryptocurrency address — stored only to enable the withdrawal system for creators
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-pink-500">Information Collected Automatically</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>
                  Server logs — IP addresses are temporarily stored in standard nginx access logs and are not
                  linked to user accounts in our database
                </li>
                <li>
                  Anonymous analytics — aggregated view counts and usage statistics derived from database
                  records. To prevent abuse, we may store hashed IP addresses for view-count verification on
                  public creator pages
                </li>
                <li>
                  Essential cookies — required for the platform to function (session handling). We use no
                  tracking cookies, no third-party cookies, and no advertising cookies.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-pink-500">What We Do NOT Collect</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Email addresses</li>
                <li>Real names or government ID</li>
                <li>KYC documents</li>
                <li>Browsing history across sites</li>
                <li>Any data sold or shared with advertisers</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">2. How We Use Data</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>To operate the platform (display profiles, process withdrawals)</li>
              <li>To provide creators with anonymous analytics about their audience</li>
              <li>To prevent abuse, spam, and view-count manipulation</li>
              <li>To comply with legal obligations if required</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Payments</h2>
            <p className="text-gray-400">
              Payments on Glosy are processed through a third-party cryptocurrency payment provider. Glosy does
              not custody user funds. A 5% platform fee is deducted at the time of transaction. The payment
              processor may have access to cryptocurrency wallet addresses involved in transactions. We encourage
              review of their privacy policy as well.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Content Storage</h2>
            <p className="text-gray-400">
              Creator content is stored securely and served via time-limited URLs. Glosy does not claim
              ownership of your content. You retain all rights. We access stored content only as necessary to
              operate the service.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Third-Party Services</h2>
            <p className="text-gray-400 mb-2">We use:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 mb-3">
              <li>A cryptocurrency payment processor for all transactions</li>
              <li>Standard server infrastructure and S3-compatible storage</li>
            </ul>
            <p className="text-gray-400">
              We do not embed third-party trackers, analytics scripts, or advertising networks.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Data Retention & Deletion</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-400 mb-3">
              <li>Server logs — rotated and deleted regularly</li>
              <li>
                Account data — you may request full deletion at any time. All associated data will be removed
                promptly and completely. No questions asked.
              </li>
              <li>
                Blockchain transactions — by nature, on-chain transactions are immutable. We encourage
                privacy-preserving currencies where available.
              </li>
            </ul>
            <p className="text-gray-400">
              To request deletion, contact us at{" "}
              <a href="mailto:nakatamodem@disroot.org" className="text-pink-500 hover:text-pink-400">
                nakatamodem@disroot.org
              </a>
              .
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Cookies</h2>
            <p className="text-gray-400">
              Glosy uses only essential cookies required for the platform to function — such as maintaining your
              session. No tracking cookies. No third-party cookies. You can block all cookies in your browser,
              but some platform features may not work.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Creator-Fan Relationship</h2>
            <p className="text-gray-400">
              Fans interacting with creator pages remain anonymous to the creator unless they choose to reveal
              their identity. Creators may optionally restrict access from certain regions; this is based on IP
              geolocation and processed transiently — not stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
