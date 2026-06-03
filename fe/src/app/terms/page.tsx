import Link from "next/link"

export const metadata = {
  title: "Terms of Service - hugs.xin",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 bg-black text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Back to Home
        </Link>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-sm text-gray-400">Last updated: May 2026</p>

          <p className="leading-relaxed text-gray-300">
            Welcome to hugs.xin. These Terms of Service govern your use of our platform. By accessing or using
            hugs.xin, you agree to be bound by these terms.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-gray-400">
              By using hugs.xin, you accept these Terms of Service and Privacy Policy. If you do not agree to these
              terms, you may not use the platform.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">2. User Accounts</h2>
            <p className="text-gray-400">
              You are responsible for maintaining the confidentiality of your account credentials and password.
              You agree to accept responsibility for all activities that occur under your account. You must
              immediately notify us of any unauthorized use of your account.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">3. User Conduct</h2>
            <p className="text-gray-400 mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Engage in harassment, abuse, or threatening behavior</li>
              <li>Upload malware, viruses, or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the platform to distribute spam or unwanted communications</li>
              <li>Manipulate view counts or engagement metrics</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Content Ownership</h2>
            <p className="text-gray-400">
              You retain all rights to content you upload to hugs.xin. By uploading content, you grant hugs.xin a
              worldwide, royalty-free license to use, display, and distribute your content for the purpose of
              operating the platform. hugs.xin does not claim ownership of your content.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Payments and Fees</h2>
            <p className="text-gray-400">
              hugs.xin charges a 5% platform fee on all transactions. Payments are processed through third-party
              cryptocurrency processors. You are responsible for understanding the terms and conditions of the
              payment processor. hugs.xin is not responsible for payment processor errors or failures. All fees are
              non-refundable unless otherwise specified.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Prohibited Content</h2>
            <p className="text-gray-400 mb-2">
              You may not upload, distribute, or display content that:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li>Is illegal or violates local, state, or federal law</li>
              <li>Infringes on copyright, trademark, or other intellectual property</li>
              <li>Contains hate speech, discrimination, or incitement to violence</li>
              <li>Depicts exploitation or abuse</li>
              <li>Is explicit sexual content involving minors</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">7. Account Termination</h2>
            <p className="text-gray-400">
              hugs.xin reserves the right to terminate or suspend your account at any time, with or without cause,
              and with or without notice. Upon termination, your right to use the platform ceases immediately.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
            <p className="text-gray-400">
              hugs.xin is provided on an "as-is" basis. We disclaim all warranties, express or implied, including
              any warranty of merchantability, fitness for a particular purpose, or non-infringement. hugs.xin
              shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of the platform.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">9. Indemnification</h2>
            <p className="text-gray-400">
              You agree to indemnify, defend, and hold harmless hugs.xin and its operators from any claims,
              damages, or expenses arising from your use of the platform or violation of these terms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">10. Modifications to Terms</h2>
            <p className="text-gray-400">
              hugs.xin reserves the right to modify these Terms of Service at any time. Continued use of the
              platform following modifications constitutes your acceptance of the updated terms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">11. Contact Us</h2>
            <p className="text-gray-400">
              For questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:nakatamodem@disroot.org" className="text-pink-500 hover:text-pink-400">
                nakatamodem@disroot.org
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
