"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Array<{ text: string; type: "input" | "output" }>>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalRef.current]) // Updated useEffect dependency

  const simulateGitCommit = async (suggestion: string) => {
    setIsProcessing(true)
    const gitCommands = [
      `$ git add .`,
      `$ git commit -m "Feature suggestion: ${suggestion}"`,
      `[main ${Math.random().toString(16).slice(2, 8)}] Feature suggestion: ${suggestion}`,
      "$ git push",
      "Enumerating objects: 5, done.",
      "Counting objects: 100% (5/5), done.",
      "Delta compression using up to 8 threads",
      "Compressing objects: 100% (3/3), done.",
      "Writing objects: 100% (3/3), 682 bytes | 682.00 KiB/s, done.",
      "Total 3 (delta 2), reused 0 (delta 0), pack-reused 0",
      "remote: Resolving deltas: 100% (2/2), completed with 2 local objects.",
      `To https://github.com/tmanzhe/sesame.git`,
      `   ${Math.random().toString(16).slice(2, 8)}..${Math.random().toString(16).slice(2, 8)}  main -> main`,
    ]

    for (const command of gitCommands) {
      setHistory((prev) => [...prev, { text: command, type: "output" }])
      await new Promise((resolve) => setTimeout(resolve, command.startsWith("$") ? 500 : 100))
    }

    setIsProcessing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isProcessing) {
      const suggestion = input.trim()
      setHistory((prev) => [...prev, { text: `$ suggest "${suggestion}"`, type: "input" }])
      setInput("")
      await simulateGitCommit(suggestion)
    }
  }

  const handleClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="mx-auto max-w-[64rem] rounded-lg bg-muted p-4 font-mono text-sm cursor-text" onClick={handleClick}>
      <div className="text-xs text-muted-foreground mb-4 italic">
        Suggest new features by typing them below. Each suggestion will be automatically committed to our repository.
      </div>
      <div ref={terminalRef} className="h-[300px] overflow-y-auto space-y-2 mb-2">
        {history.map((line, i) => (
          <div
            key={i}
            className={cn(
              "whitespace-pre-wrap break-all",
              line.type === "input" && "text-green-500 dark:text-green-400",
            )}
          >
            {line.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={cn("flex-1 bg-transparent outline-none", "placeholder:text-muted-foreground")}
          placeholder="Type your feature suggestion..."
          spellCheck="false"
          autoComplete="off"
          disabled={isProcessing}
        />
      </form>
    </div>
  )
}

