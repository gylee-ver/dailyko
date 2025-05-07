"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <header className="p-4 border-b flex justify-center items-center h-16">
        <button onClick={() => router.push('/')}>
          <Image src="/DAILYKO - LOGO.png" alt="DailyKo Logo" width={120} height={40} className="h-10 w-auto" />
        </button>
      </header>

      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
            <p>We collect the following information:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Name</li>
              <li>Email address</li>
              <li>WhatsApp number</li>
              <li>Payment information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Provide our language learning service</li>
              <li>Process your payments</li>
              <li>Send you daily messages</li>
              <li>Improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal information. Your data is:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Encrypted during transmission</li>
              <li>Stored securely</li>
              <li>Never shared with third parties without consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Access your personal data</li>
              <li>Request data correction</li>
              <li>Request data deletion</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. Contact Us</h2>
            <p>For privacy-related inquiries, contact us at:</p>
            <p className="mt-2">Email: 102536gy@gmail.com</p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#25D366] text-white py-6 px-4 text-center text-sm">
        <p className="mb-2">© 2023 DailyKo. All rights reserved.</p>
        <p>Just one message a day. No app. No stress.</p>
      </footer>
    </div>
  )
} 