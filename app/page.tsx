// 1. 注意：这里不再需要 "use client"
import { Suspense } from 'react'
import WelcomeClient from '@/components/welcome-client' // 2. 导入我们刚刚创建的新组件

export default function HomePage() {
  return (
    // 3. 使用 Suspense 包裹客户端组件
    // fallback 可以是一个加载指示器，或者对于全屏动画，一个空的 div 也可以
    <Suspense fallback={<div className="w-full h-screen" />}>
      <WelcomeClient />
    </Suspense>
  )
}