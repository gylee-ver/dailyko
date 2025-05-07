"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function TermsPage() {
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
        <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
        
        <div className="space-y-6 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using DailyKo's services, you agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">2. Service Description</h2>
            <p>DailyKo provides daily Korean language learning content through WhatsApp messages. The service includes:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Daily Korean sentences</li>
              <li>English translations</li>
              <li>Pronunciation guides</li>
              <li>Cultural context</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">3. Subscription and Payment</h2>
            <p>We offer two subscription plans:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Annual Pass: $17.50/year</li>
              <li>Half Pass: $9.20/6 months</li>
            </ul>
            <p className="mt-2">All payments are processed securely through our payment providers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">4. Cancellation Policy</h2>
            <p>You may cancel your subscription at any time. Refunds are available within 7 days of purchase.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">5. User Responsibilities</h2>
            <p>Users are responsible for:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Providing accurate contact information</li>
              <li>Maintaining the security of their account</li>
              <li>Using the service in compliance with these terms</li>
            </ul>
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