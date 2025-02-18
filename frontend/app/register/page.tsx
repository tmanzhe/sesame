import type { Metadata } from "next"
import Link from "next/link"
import { FileJson, ListTodo, StickyNote, FileCode, Key, Hash } from "lucide-react"
import { Card } from "@/components/ui/card"
import { RegisterForm } from "@/components/register-form"

export const metadata: Metadata = {
  title: "Register - Sesame",
  description: "Create your account to access Sesame's productivity tools",
}

export default function RegisterPage() {
  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-8 lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
        <div className="relative z-20 flex flex-grow items-center justify-center">
          <div className="w-full max-w-2xl">
            <div className="border border-border/50 rounded-lg p-6 bg-background/95 backdrop-blur-sm">
              <h2 className="text-3xl font-semibold mb-6 text-center">Boost Your Productivity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: ListTodo,
                    title: "To-Do List",
                    description: "With media support",
                  },
                  {
                    icon: StickyNote,
                    title: "Study Timer",
                    description: "Track sessions",
                  },
                  {
                    icon: FileJson,
                    title: "Calendar Integration",
                    description: "Sync schedules",
                  },
                  {
                    icon: FileCode,
                    title: "Basic Analytics",
                    description: "Study insights",
                  },
                  {
                    icon: Key,
                    title: "AI Assistant",
                    description: "Smart productivity",
                  },
                  {
                    icon: Hash,
                    title: "Future Features",
                    description: "Always improving",
                  },
                ].map((tool, i) => (
                  <Card
                    key={i}
                    className="p-4 bg-background/95 backdrop-blur-sm border-border/50 hover:border-foreground/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <tool.icon className="h-8 w-8 text-foreground/80" />
                      <div>
                        <p className="font-medium text-sm">{tool.title}</p>
                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-20 mt-auto text-center">
          <p className="text-sm text-muted-foreground">
            Optimize your study workflow with our comprehensive suite of tools.
          </p>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-4 sm:px-0">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Sign up to start boosting your productivity</p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

