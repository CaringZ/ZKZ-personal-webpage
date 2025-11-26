import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { ToasterConfig } from "./_components/ToasterConfig"
import "./globals.css"

export const metadata: Metadata = {
  title: "我的作品集 - Portfolio Showcase",
  description: "探索我的商业案例、项目开发与美术创作",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <ToasterConfig />
      </body>
    </html>
  )
}
