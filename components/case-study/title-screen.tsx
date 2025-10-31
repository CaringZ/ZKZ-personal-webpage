"use client"

import { AnimatePresence, motion } from "framer-motion"

interface TitleScreenProps {
  isActivated: boolean
  onActivate: () => void
}

export default function TitleScreen({ isActivated, onActivate }: TitleScreenProps) {
  return (
    <section className="flex h-screen w-full items-center justify-center px-8">
      <div className="max-w-5xl text-center">
        <motion.h1
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={onActivate}
          className="mb-8 cursor-pointer font-sans text-5xl font-bold leading-tight tracking-tight text-foreground transition-colors hover:text-accent md:text-7xl"
        >
          商业案例：AI驱动的全链路电商自动化解决方案
        </motion.h1>

        <AnimatePresence mode="wait">
          {isActivated && (
            <motion.div
              key="subtitle-wrapper"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <motion.h3
                initial={{ y: 12 }}
                animate={{ y: 0 }}
                exit={{ y: 12 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-sans text-xl font-light leading-relaxed text-muted-foreground md:text-2xl"
              >
                从创意到爆款：1.5个月上线15000+SKU，孵化4万+销量爆品的实践路径
              </motion.h3>
            </motion.div>
          )}
        </AnimatePresence>

        {isActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">滚动以探索</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="text-accent"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        )}

        {!isActivated && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 font-mono text-sm text-muted-foreground"
          >
            点击标题开始
          </motion.p>
        )}
      </div>
    </section>
  )
}
