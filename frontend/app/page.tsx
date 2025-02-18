import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ListTodo, Calendar, Clock, BarChart, Users, Trophy, Brain, LineChart } from "lucide-react"
import { Terminal } from "@/components/ui/terminal"
import { FadeIn } from "@/components/ui/fade-in"
import { Typewriter } from "@/components/ui/typewriter"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[100vh] space-y-4 px-4 text-center border-b border-border/50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/5 to-background/50" />
        <FadeIn className="space-y-4">
          <div className="inline-block rounded-full px-3 py-1 text-xs sm:text-sm border border-border/50 bg-background/95">
            All-in-One Productivity App
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl h-[1.5em]">
            <Typewriter text="Introducing Sesame" delay={100} />
          </h1>
          <p className="mx-auto max-w-[700px] text-sm text-muted-foreground sm:text-base md:text-lg">
            Elevate your academic potential with Sesame. Our AI-powered platform streamlines your study workflow,
            helping you stay focused, organized, and on track to achieve your goals.
          </p>
        </FadeIn>
        <FadeIn delay={500}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-10 px-6 sm:h-11 sm:px-8" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </FadeIn>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-muted-foreground">Scroll to explore</div>
            <div className="h-2 w-0.5 bg-muted-foreground/50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container space-y-6 py-12 md:py-24">
        <FadeIn>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Current Features</h2>
            <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
              Interact with our AI-powered bot Sesame to boost your productivity
            </p>
          </div>
        </FadeIn>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
          {[
            {
              icon: ListTodo,
              title: "To-Do List",
              description: "Organize and prioritize your tasks",
            },
            {
              icon: Calendar,
              title: "Google Calendar Integration",
              description: "View and edit schedules",
            },
            {
              icon: Clock,
              title: "Study Timer Tracker",
              description: "Keep track of study sessions",
            },
            {
              icon: BarChart,
              title: "Basic Analytics",
              description: "Insights into study habits",
            },
          ].map((feature, index) => (
            <FadeIn key={index} delay={index * 100}>
              <Card className="group relative overflow-hidden border border-border/50 bg-background p-6 transition-all hover:border-foreground/20">
                <div className="flex flex-col items-center space-y-4">
                  <feature.icon className="h-12 w-12" />
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Future Features Section */}
      <section id="future-features" className="container space-y-6 py-12 md:py-24">
        <FadeIn>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Future Features</h2>
            <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
              Exciting enhancements coming soon to Sesame
            </p>
          </div>
        </FadeIn>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2">
          {[
            {
              icon: Users,
              title: "Social Features",
              description: "View others' study profiles and progress",
            },
            {
              icon: Trophy,
              title: "Gamification",
              description: "Unlock character upgrades based on study time",
            },
            {
              icon: Brain,
              title: "AI-Powered Productivity",
              description: "Smart task prioritization and study assistant",
            },
            {
              icon: LineChart,
              title: "Advanced Analytics",
              description: "Detailed insights and personalized recommendations",
            },
          ].map((feature, index) => (
            <FadeIn key={index} delay={index * 100}>
              <Card
                key={index}
                className="group relative overflow-hidden border border-border/50 bg-background p-6 transition-all hover:border-foreground/20"
              >
                <div className="flex flex-col items-center space-y-4">
                  <feature.icon className="h-12 w-12" />
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Latest Updates Section */}
      <section id="docs" className="border-t border-border/50">
        <div className="container space-y-6 py-12 md:py-24">
          <FadeIn>
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Latest Updates</h2>
              <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
                Latest updates and suggest a feature!
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <Terminal />
          </FadeIn>
        </div>
      </section>

      {/* Why Section */}
      <section className="border-t border-border/50">
        <div className="container space-y-6 py-12 md:py-24">
          <FadeIn>
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Why Sesame?</h2>
              <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">Built by students, for students</p>
            </div>
          </FadeIn>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem]">
            {[
              {
                title: "All-in-One Solution",
                description:
                  "Access all your essential productivity tools in one place, saving time and reducing context switching.",
              },
              {
                title: "AI-Powered Assistant",
                description: "Leverage the power of AI to optimize your study habits and boost productivity.",
              },
            ].map((feature, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card
                  key={index}
                  className="group relative overflow-hidden border border-border/50 bg-background p-6 transition-all hover:border-foreground/20"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50">
        <div className="container space-y-6 py-12 md:py-24">
          <FadeIn>
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Tap Into Your Full Potential
              </h2>
              <p className="max-w-[85%] text-sm text-muted-foreground sm:text-base">
                Unlock your academic success with Sesame's powerful productivity tools
              </p>
              <Button size="lg" className="h-10 px-6 sm:h-11 sm:px-8" asChild>
                <Link href="/register">Start Your Journey</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

