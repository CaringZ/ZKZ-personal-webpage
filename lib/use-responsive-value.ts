"use client"

import { useEffect, useMemo, useState } from "react"

export type ResponsiveBreakpoint<T> = {
  maxWidth: number
  value: T
}

export function resolveResponsiveValue<T>(
  width: number,
  defaultValue: T,
  breakpoints: ResponsiveBreakpoint<T>[],
) {
  const breakpoint = breakpoints.find((entry) => width <= entry.maxWidth)
  return breakpoint?.value ?? defaultValue
}

export function useResponsiveValue<T>(defaultValue: T, breakpoints: ResponsiveBreakpoint<T>[]) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return defaultValue
    }
    return resolveResponsiveValue(window.innerWidth, defaultValue, breakpoints)
  })

  const serializedBreakpoints = useMemo(
    () => JSON.stringify(breakpoints),
    [breakpoints],
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const update = () => {
      setValue((prev) => {
        const next = resolveResponsiveValue(
          window.innerWidth,
          defaultValue,
          breakpoints,
        )
        return prev === next ? prev : next
      })
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [defaultValue, breakpoints, serializedBreakpoints])

  return value
}
