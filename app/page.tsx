"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ParticleAnimation from "@/components/particle-animation"

export default function WelcomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showReturnFeedback, setShowReturnFeedback] = useState(false)

  useEffect(() => {
    const from = searchParams.get("from")
    if (from === "dashboard") {
      setShowReturnFeedback(true)
      const timeout = window.setTimeout(() => setShowReturnFeedback(false), 1000)
      router.replace("/", { scroll: false })
      return () => window.clearTimeout(timeout)
    }
  }, [router, searchParams])

  return (
    <div className="relative w-full h-screen">
      <ParticleAnimation onEnter={() => router.push("/dashboard")} returnFeedback={showReturnFeedback} />
    </div>
  )
}
