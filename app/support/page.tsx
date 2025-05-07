"use client"

import Link from "next/link"
import Image from "next/image"
import { MessageCircle } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <header className="p-4 border-b flex justify-center items-center h-16">
        <Link href="/">
          <Image src="/DAILYKO - LOGO.png" alt="DailyKo Logo" width={120} height={40} className="h-10 w-auto" />
        </Link>
      </header>

      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-6">Support Center</h1>
        
        <div className="space-y-6 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p>We're here to help! Reach out to us through:</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-[#25D366]" />
                <span>Email: 102536gy@gmail.com</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">How do I start receiving messages?</h3>
                <p className="mt-1">After subscribing, you'll receive a welcome message on WhatsApp. Daily messages will begin the next day.</p>
              </div>
              <div>
                <h3 className="font-medium">Can I change my WhatsApp number?</h3>
                <p className="mt-1">Yes, contact us with your new number and we'll update your account.</p>
              </div>
              <div>
                <h3 className="font-medium">What if I miss a day?</h3>
                <p className="mt-1">No worries! You can access all past messages in your WhatsApp chat history.</p>
              </div>
              <div>
                <h3 className="font-medium">How do I cancel my subscription?</h3>
                <p className="mt-1">You can cancel anytime through your account settings or by contacting us.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2">Response Time</h2>
            <p>We typically respond to inquiries within 24 hours during business days.</p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#25D366] text-white py-6 px-4 text-center text-sm">
        <p className="mb-2">© 2023 DailyKo. All rights reserved.</p>
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/support" className="hover:underline">
            Support
          </Link>
        </div>
        <p>Just one message a day. No app. No stress.</p>
      </footer>
    </div>
  )
} 