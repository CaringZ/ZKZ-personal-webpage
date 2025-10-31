"use client"

import { useEffect } from "react"
import HorizontalScrollCaseStudy from "@/components/horizontal-scroll-case-study"

export default function BusinessCasesPage() {
  useEffect(() => {
    document.body.classList.add("no-scrollbar")
    document.documentElement.classList.add("no-scrollbar")
    return () => {
      document.body.classList.remove("no-scrollbar")
      document.documentElement.classList.remove("no-scrollbar")
    }
  }, [])

  return (
    <div className="case-study-theme min-h-screen bg-background text-foreground">
      <HorizontalScrollCaseStudy />
    </div>
  )
}
