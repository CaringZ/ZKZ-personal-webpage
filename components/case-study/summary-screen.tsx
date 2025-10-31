"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="font-mono text-6xl font-bold text-accent md:text-8xl">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export default function SummaryScreen() {
  return (
    <section className="flex h-screen w-screen items-center justify-center px-8">
      <div className="max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center font-sans text-4xl font-bold text-foreground md:text-5xl"
        >
          最终成果：技术驱动的商业胜利
        </motion.h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Metric 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-lg border border-accent/20 bg-card/50 p-8 backdrop-blur-sm"
          >
            <AnimatedNumber value={15000} suffix="+" />
            <p className="mt-4 font-sans text-xl font-medium text-foreground">SKU上架数量 (1.5个月)</p>
            <p className="mt-2 font-mono text-sm text-muted-foreground">(平均每天产出相当于30人团队3天的产出)</p>
          </motion.div>

          {/* Metric 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-lg border border-accent/20 bg-card/50 p-8 backdrop-blur-sm"
          >
            <AnimatedNumber value={30000} suffix="+" />
            <p className="mt-4 font-sans text-xl font-medium text-foreground">爆品A累计销量 (2个月)</p>
          </motion.div>

          {/* Metric 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-lg border border-accent/20 bg-card/50 p-8 backdrop-blur-sm"
          >
            <AnimatedNumber value={40000} suffix="+" />
            <p className="mt-4 font-sans text-xl font-medium text-foreground">爆品B累计销量 (3个月)</p>
          </motion.div>

          {/* Metric 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center rounded-lg border border-accent/20 bg-card/50 p-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
              viewport={{ once: true }}
              className="font-mono text-8xl text-accent"
            >
              ✓
            </motion.div>
            <p className="mt-4 font-sans text-xl font-medium text-foreground">商业闭环验证</p>
            <p className="mt-2 text-center font-mono text-sm text-muted-foreground">
              成功打通从AI技术到商业盈利的全链路
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
