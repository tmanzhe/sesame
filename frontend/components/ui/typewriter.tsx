"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

export function Typewriter({ text, delay = 50, className = "", onComplete }: TypewriterProps) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, delay, text, onComplete])

  return <span className={className}>{currentText}</span>
}

