"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MessageCircle, ShoppingBag, Star, Timer, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Review type definition
type Review = {
  id: string
  name: string
  rating: number
  date: string
  text: string
}

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isTimerVisible, setIsTimerVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSet, setCurrentPageSet] = useState(1) // Tracks which set of 9 pages we're viewing
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [isEmailTooltipVisible, setIsEmailTooltipVisible] = useState(false)
  const [isPlanModalVisible, setIsPlanModalVisible] = useState(false)
  const [newReview, setNewReview] = useState<{
    name: string
    rating: number
    text: string
  }>({
    name: "",
    rating: 5,
    text: "",
  })
  const [reviews, setReviews] = useState<Review[]>([])
  const timerRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)

  // Initialize reviews data
  useEffect(() => {
    // Generate 45 reviews (9 pages with 5 reviews each)
    const generatedReviews: Review[] = []

    // First add the initial 5 reviews
    generatedReviews.push(
      {
        id: "1",
        name: "Sarah J.",
        rating: 5,
        date: "2 days ago",
        text: "I've been trying to learn Korean for my K-drama obsession, and this is perfect! Just one sentence a day is so manageable.",
      },
      {
        id: "2",
        name: "Emily L.",
        rating: 5,
        date: "1 week ago",
        text: "Love getting my daily Korean sentence! It's helping me understand my favorite K-pop songs better. Totally worth it!",
      },
      {
        id: "3",
        name: "Michelle T.",
        rating: 4,
        date: "2 weeks ago",
        text: "Simple and effective. I like how they include context from dramas and songs. Would recommend to any K-culture fan.",
      },
      {
        id: "4",
        name: "Jessica K.",
        rating: 5,
        date: "3 weeks ago",
        text: "This is exactly what I needed! No complicated apps, just a simple WhatsApp message each day. The pronunciation guide is super helpful.",
      },
      {
        id: "5",
        name: "Alyssa R.",
        rating: 5,
        date: "1 month ago",
        text: "Best $13.50 I've spent this year! I'm slowly building my Korean vocabulary and it feels effortless.",
      },
    )

    // Generate additional reviews for pages 2-9
    const names = ["Alex", "Taylor", "Jordan", "Morgan", "Casey", "Riley", "Jamie", "Quinn", "Avery", "Cameron"]
    const timeframes = ["1 month ago", "2 months ago", "3 months ago", "4 months ago", "5 months ago", "6 months ago"]
    const comments = [
      "This app has been a game-changer for my Korean learning journey!",
      "I love how simple yet effective this approach is. One sentence a day is perfect.",
      "The cultural context they provide with each sentence is so valuable.",
      "Great value for the price. I've learned more in a month than I did with other apps.",
      "The WhatsApp delivery is so convenient. No need to download another app!",
      "I appreciate how they include sentences from popular K-dramas.",
      "The pronunciation guide is super helpful for a beginner like me.",
      "I've been recommending this to all my K-pop fan friends.",
      "Worth every penny! The sentences are practical and useful.",
      "I like how they gradually increase the difficulty over time.",
    ]

    // Generate 100 reviews for 20 pages
    for (let i = 6; i <= 100; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)]
      const randomRating = Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
      const randomDate = timeframes[Math.floor(Math.random() * timeframes.length)]
      const randomText = comments[Math.floor(Math.random() * comments.length)]

      generatedReviews.push({
        id: i.toString(),
        name: `${randomName} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}.`,
        rating: randomRating,
        date: randomDate,
        text: randomText,
      })
    }

    setReviews(generatedReviews)
  }, [])

  // Timer countdown logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const nyTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
      const targetTime = new Date(nyTime)
      targetTime.setHours(11, 0, 0, 0)
      
      // 다음 날 11시로 설정
      if (nyTime.getHours() >= 11) {
        targetTime.setDate(targetTime.getDate() + 1)
      }
      
      const timeLeft = targetTime.getTime() - nyTime.getTime()
      return {
        hours: Math.floor(timeLeft / (1000 * 60 * 60)),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
      }
    }

    const updateTimer = () => {
      const { hours: h, minutes: m, seconds: s } = calculateTimeLeft()
      setHours(h)
      setMinutes(m)
      setSeconds(s)
    }

    // 초기 타이머 설정
    updateTimer()

    // 1초마다 타이머 업데이트
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  // Sticky timer logic
  useEffect(() => {
    const handleScroll = () => {
      if (timerRef.current) {
        const timerPosition = timerRef.current.getBoundingClientRect().top
        if (timerPosition < 0) {
          setIsTimerVisible(true)
        } else {
          setIsTimerVisible(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update page set when current page changes
  useEffect(() => {
    const newPageSet = Math.ceil(currentPage / 9)
    if (newPageSet !== currentPageSet) {
      setCurrentPageSet(newPageSet)
    }
  }, [currentPage, currentPageSet])

  // Scroll to reviews when clicking on reviews link
  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (newReview.name.trim() === "" || newReview.text.trim() === "") {
      return // Don't submit if required fields are empty
    }

    const reviewToAdd: Review = {
      id: `new-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      date: "now",
      text: newReview.text,
    }

    setReviews([reviewToAdd, ...reviews])
    setNewReview({ name: "", rating: 5, text: "" })
    setIsReviewModalOpen(false)
    setCurrentPage(1) // Go to first page to see the new review
    setCurrentPageSet(1) // Reset to first page set
  }

  // Handle pagination navigation
  const handleNextPageSet = () => {
    const nextPageSet = currentPageSet + 1
    setCurrentPageSet(nextPageSet)
    setCurrentPage((nextPageSet - 1) * 9 + 1) // Go to first page of next set
  }

  const handlePrevPageSet = () => {
    const prevPageSet = currentPageSet - 1
    setCurrentPageSet(prevPageSet)
    setCurrentPage((prevPageSet - 1) * 9 + 1) // Go to first page of previous set
  }

  // Product images for carousel
  const productImages = ["/Paypal_1.png", "/Frame 2.png", "/Frame 3.png", "/Frame 4.png", "/Frame 5.png"]

  // Pagination logic
  const reviewsPerPage = 5
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const paginatedReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage)

  // Calculate which page numbers to show
  const startPage = (currentPageSet - 1) * 9 + 1
  const endPage = Math.min(startPage + 8, totalPages)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  // 이미지 확장 모달 닫기 함수
  const handleCloseExpandedImage = () => {
    setIsImageExpanded(false)
  }

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsImageExpanded(false)
      }
    }

    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [])

  // 이메일 복사 함수 추가
  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('102536gy@gmail.com')
    } catch (err) {
      console.error('이메일 복사 실패:', err)
    }
  }

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.email-tooltip') && !target.closest('.contact-button')) {
        setIsEmailTooltipVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white">
      {/* Sticky timer */}
      {isTimerVisible && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black text-center py-1.5 max-w-md mx-auto">
          <p className="text-[#39FF14] font-medium flex items-center justify-center text-sm">
            <Timer className="h-3.5 w-3.5 mr-1" /> Sale ends in: {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </p>
        </div>
      )}

      {/* Header */}
      <header className="p-4 border-b flex justify-center items-center h-16">
        <Image src="/DAILYKO - LOGO.png" alt="DailyKo Logo" width={120} height={40} className="h-10 w-auto" />
      </header>

      <main className="flex-1">
        {/* Product Image Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out w-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {productImages.map((src, index) => (
              <div key={index} className="min-w-full">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(productImages.length - 1, prev + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10"
            disabled={currentSlide === productImages.length - 1}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-2 pb-2 absolute bottom-0 left-0 right-0 z-10">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn("w-2 h-2 rounded-full", currentSlide === index ? "bg-white" : "bg-white/50")}
              />
            ))}
          </div>
        </div>

        {/* Product Title */}
        <div className="px-4 mt-5">
          <h1 className="text-3xl font-bold text-left">DailyKo : Learn Korean One Sentence at a Time</h1>
        </div>

        {/* Ratings */}
        <div className="px-4 mt-2 flex items-center" onClick={scrollToReviews}>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="ml-2 text-sm text-blue-600 underline cursor-pointer">379 reviews</span>
        </div>

        {/* Pricing */}
        <div className="px-4 mt-4">
          <div className="flex flex-col items-start">
            <div>
              <span className="text-gray-500 line-through text-2xl tracking-tight">$25.00</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-red-600 font-bold mr-2 text-4xl tracking-tighter">30%</span>
              <span className="text-4xl font-bold tracking-tighter">$17.50</span>
            </div>
          </div>
        </div>

        {/* Timer Section */}
        <div ref={timerRef} className="px-4 mt-4 py-1.5 bg-black border-y border-black">
          <p className="text-center font-medium text-[#39FF14] flex items-center justify-center text-sm">
            <Timer className="h-3.5 w-3.5 mr-1" /> Sale ends in: {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
          </p>
        </div>

        {/* Product Description */}
        <div className="px-4 mt-6">
          <h2 className="text-lg font-semibold mb-2">Learn Korean the Easy Way</h2>
          <p className="text-justify text-gray-700">
            DailyKo sends you just one Korean sentence every day through WhatsApp. Each message includes the Korean
            sentence, English translation, romanization (how to pronounce it), and cultural context. Perfect for K-pop
            and K-drama fans who want to learn Korean without the stress of formal lessons or complicated apps. Just 4
            cents per day with our annual plan!
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 mr-2 mt-1">
                <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm">No app installation required</p>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 mr-2 mt-1">
                <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm">Sentences from real K-dramas and K-pop songs</p>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 mr-2 mt-1">
                <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm">7-day money-back guarantee</p>
            </div>
          </div>
        </div>

        {/* Detailed Product Images */}
        <div className="mt-8">
          <div className="relative">
            {!isImageExpanded && (
              <div className="overflow-hidden" style={{ height: '300px' }}>
                <Image
                  src="/details page ver.1.png"
                  alt="Product details"
                  width={400}
                  height={800}
                  className="w-full"
                />
                {/* 그라데이션 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent" />
                <Button
                  onClick={() => setIsImageExpanded(true)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#25D366] hover:bg-[#128C7E] 
                           text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl 
                           transition-all duration-200 border border-[#25D366] hover:border-[#128C7E]"
                  size="sm"
                >
                  View Full Image
                </Button>
              </div>
            )}

            {isImageExpanded && (
              <Image
                src="/details page ver.1.png"
                alt="Product details"
                width={400}
                height={800}
                className="w-full"
              />
            )}
          </div>
        </div>

        {/* Plans Section */}
        <div className="px-4 mt-8">
          <h2 className="text-xl font-bold mb-4">Choose Your Plan</h2>

          <div className="border rounded-lg p-4 mb-3 bg-green-50 border-green-200 relative">
            <div className="absolute -top-2 right-4 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              MOST POPULAR
            </div>
            <h3 className="font-bold">Annual Pass</h3>
            <p className="text-2xl font-bold mt-1">
              $17.50 <span className="text-sm font-normal text-gray-600">/year</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">Just 4.8¢ per day</p>
            <p className="text-sm mt-2">30% discount, best value</p>
            <Button 
              className="w-full mt-3 bg-green-600 hover:bg-green-700"
              onClick={() => window.open('https://tally.so/r/n9xK5X', '_blank')}
            >
              Choose Annual Pass
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold">Half Pass</h3>
            <p className="text-2xl font-bold mt-1">
              $9.20 <span className="text-sm font-normal text-gray-600">/6months</span>
            </p>
            <p className="text-sm text-gray-600 mt-1">Stress-free. 6 months, one smart move.</p>
            <p className="text-sm mt-2">Flexible option to start</p>
            <Button 
              variant="outline" 
              className="w-full mt-3"
              onClick={() => window.open('https://tally.so/r/n9xK5X', '_blank')}
            >
              Choose half Pass
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="px-4 mt-12 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Customer Reviews</h2>
            <Button variant="outline" size="sm" onClick={() => setIsReviewModalOpen(true)}>
              Write a Review
            </Button>
          </div>

          <div className="space-y-4 h-[600px] overflow-y-auto">
            {paginatedReviews.map((review) => (
              <div key={review.id} className="border-b pb-4 min-h-[120px] max-h-[150px] overflow-y-auto">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{review.name}</h3>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-3 w-3", i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
                    />
                  ))}
                </div>
                <p className="text-sm mt-2 text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-1 flex-wrap items-center">
            {currentPageSet > 1 && (
              <button
                onClick={handlePrevPageSet}
                className="w-8 h-8 rounded-full text-sm bg-gray-100 text-gray-800 flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            {pageNumbers.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  "w-8 h-8 rounded-full text-sm",
                  currentPage === pageNum ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800",
                )}
              >
                {pageNum}
              </button>
            ))}

            {currentPageSet < Math.ceil(totalPages / 9) && (
              <button
                onClick={handleNextPageSet}
                className="w-8 h-8 rounded-full text-sm bg-gray-100 text-gray-800 flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#25D366] text-white py-6 px-4 text-center text-sm">
        <p className="mb-2">© 2023 DailyKo. All rights reserved.</p>
        <p>Just one message a day. No app. No stress.</p>
      </footer>

      {/* Bottom spacing to account for fixed navigation */}
      <div className="h-14"></div>

      {/* Sticky Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex max-w-md mx-auto">
        <div className="relative w-1/2">
          {isEmailTooltipVisible && (
            <div className="email-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 w-49">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">102536gy@gmail.com</span>
                <button
                  onClick={copyEmailToClipboard}
                  className="ml-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded text-gray-700"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          <Button 
            variant="outline" 
            className="contact-button w-full rounded-none h-14 border-0 text-gray-700"
            onClick={() => setIsEmailTooltipVisible(!isEmailTooltipVisible)}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
        </div>
        <Button 
          className="w-1/2 rounded-none h-14 bg-[#25D366] hover:bg-[#128C7E] text-white"
          onClick={() => window.open('https://tally.so/r/n9xK5X', '_blank')}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Get Started Now
        </Button>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-4 relative">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-bold mb-3">Write a Review</h3>

            <form onSubmit={handleReviewSubmit} className="text-sm">
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={cn(
                          "h-6 w-6",
                          star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full p-1.5 border rounded-md text-sm"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="review" className="block text-sm font-medium mb-1">
                  Review
                </label>
                <textarea
                  id="review"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full p-1.5 border rounded-md h-20 text-sm"
                  placeholder="Share your experience with DailyKo..."
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="mr-2 text-xs h-8"
                >
                  Cancel
                </Button>
                <Button type="submit" className="text-xs h-8">
                  Submit Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
