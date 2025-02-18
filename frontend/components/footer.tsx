import { Wrench } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Wrench className="h-6 w-6" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Empowering students to achieve their academic goals.
          </p>
        </div>
      </div>
    </footer>
  )
}

