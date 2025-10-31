"use client"

import { motion } from "framer-motion"

export type SceneTag = {
  text: string
  position: "top-left" | "top-right" | "left" | "right" | "bottom"
  highlight?: boolean
}

export interface SceneLayoutProps {
  title: string
  tags: SceneTag[]
}

export default function SceneLayout({ title, tags }: SceneLayoutProps) {
  const colorPalette = ["#00f5a0", "#00d4ff", "#ff74c6", "#ffa94d", "#7c5cff", "#4ade80"]

  const getTagPosition = (position: SceneTag["position"]) => {
    switch (position) {
      case "top-left":
        return "absolute left-[10%] top-[15%]"
      case "top-right":
        return "absolute right-[10%] top-[15%]"
      case "left":
        return "absolute left-[5%] top-1/2 -translate-y-1/2"
      case "right":
        return "absolute right-[5%] top-1/2 -translate-y-1/2"
      case "bottom":
        return "absolute bottom-[15%] left-1/2 -translate-x-1/2"
    }
  }

  const getLinePosition = (position: SceneTag["position"]) => {
    switch (position) {
      case "top-left":
        return { x1: "50%", y1: "50%", x2: "30%", y2: "25%" }
      case "top-right":
        return { x1: "50%", y1: "50%", x2: "70%", y2: "25%" }
      case "left":
        return { x1: "50%", y1: "50%", x2: "20%", y2: "50%" }
      case "right":
        return { x1: "50%", y1: "50%", x2: "80%", y2: "50%" }
      case "bottom":
        return { x1: "50%", y1: "50%", x2: "50%", y2: "75%" }
    }
  }

  return (
    <section className="relative flex h-screen w-screen items-center justify-center px-8">
      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
        {tags.map((tag, index) => {
          const tagColor = colorPalette[index % colorPalette.length]
          const line = getLinePosition(tag.position)
          return (
            <motion.line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={`${tagColor}40`}
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            />
          )
        })}
      </svg>

      {/* Central card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl rounded-2xl border border-accent/40 bg-card/80 p-10 backdrop-blur-md shadow-[0_0_35px_rgba(0,245,160,0.1)]"
      >
        <p className="text-center font-sans text-2xl md:text-3xl font-semibold leading-snug text-foreground">
          {title}
        </p>
      </motion.div>

      {/* Surrounding tags */}
      {tags.map((tag, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          viewport={{ once: true }}
          className={`${getTagPosition(tag.position)} z-20 max-w-sm md:max-w-lg rounded-xl border px-5 py-3 md:px-7 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.35)]`}
          style={{
            borderColor: tag.highlight
              ? colorPalette[index % colorPalette.length]
              : `${colorPalette[index % colorPalette.length]}33`,
            backgroundColor: tag.highlight
              ? `${colorPalette[index % colorPalette.length]}`
              : "#151515e6",
            color: tag.highlight ? "#0a0a0a" : colorPalette[index % colorPalette.length],
            boxShadow: `0 0 18px ${colorPalette[index % colorPalette.length]}25`,
          }}
        >
          <p
            className="text-center font-mono text-base leading-relaxed tracking-wide whitespace-normal md:whitespace-nowrap"
            style={{ wordBreak: "keep-all" }}
          >
            {tag.text}
          </p>
        </motion.div>
      ))}
    </section>
  )
}
