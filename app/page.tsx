"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Brain, BarChart3 } from "lucide-react"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen landing-gradient">
      <div className="w-full px-4 md:container md:mx-auto py-8 md:py-16 pb-20 md:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[calc(100vh-8rem)] md:min-h-[80vh]">
          {/* Text Section */}
          <div
            className={`space-y-6 md:space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Smart Student
                <span className="gradient-text-light dark:gradient-text-dark"> Handler</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                Your AI Academic Assistant
              </p>
            </div>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Automate attendance, store study materials, and get AI-powered exam help – all in one place. Transform
              your academic journey with intelligent tools designed for modern students.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 btn-gradient-primary pulse-glow w-full sm:w-auto"
                onClick={() => router.push("/home")}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-green-500 text-green-600 hover:bg-green-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 bg-transparent backdrop-blur-sm w-full sm:w-auto"
              >
                Learn More
              </Button>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-8">
              <div className="text-center space-y-2 float-animation">
                <div className="w-12 h-12 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-green-600 dark:from-blue-400 dark:to-blue-600 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <GraduationCap className="w-6 h-6 md:w-6 md:h-6 text-white" />
                </div>
                <p className="text-sm md:text-sm text-gray-600 dark:text-gray-400">Attendance</p>
              </div>
              <div className="text-center space-y-2 float-animation" style={{ animationDelay: "0.5s" }}>
                <div className="w-12 h-12 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-700 dark:from-blue-500 dark:to-blue-700 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <BookOpen className="w-6 h-6 md:w-6 md:h-6 text-white" />
                </div>
                <p className="text-sm md:text-sm text-gray-600 dark:text-gray-400">Storage</p>
              </div>
              <div className="text-center space-y-2 float-animation" style={{ animationDelay: "1s" }}>
                <div className="w-12 h-12 md:w-12 md:h-12 bg-gradient-to-br from-green-600 to-green-800 dark:from-blue-600 dark:to-blue-800 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <Brain className="w-6 h-6 md:w-6 md:h-6 text-white" />
                </div>
                <p className="text-sm md:text-sm text-gray-600 dark:text-gray-400">AI Helper</p>
              </div>
              <div className="text-center space-y-2 float-animation" style={{ animationDelay: "1.5s" }}>
                <div className="w-12 h-12 md:w-12 md:h-12 bg-gradient-to-br from-green-700 to-green-900 dark:from-blue-700 dark:to-blue-900 rounded-lg flex items-center justify-center mx-auto shadow-lg">
                  <BarChart3 className="w-6 h-6 md:w-6 md:h-6 text-white" />
                </div>
                <p className="text-sm md:text-sm text-gray-600 dark:text-gray-400">Analytics</p>
              </div>
            </div>
          </div>

          {/* Illustration Section */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative mx-2 md:mx-0">
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-green-400 via-green-500 to-green-600 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center float-animation">
                <div className="text-white text-center space-y-3 md:space-y-4">
                  <GraduationCap className="w-16 h-16 md:w-24 md:h-24 mx-auto opacity-90" />
                  <p className="text-lg md:text-xl font-semibold">Academic Excellence</p>
                  <p className="text-green-100 dark:text-blue-100 text-sm md:text-base">Powered by AI</p>
                </div>
              </div>

              {/* Floating Cards */}
              <div
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 card-gradient rounded-lg md:rounded-xl shadow-lg flex items-center justify-center float-animation"
                style={{ animationDelay: "2s" }}
              >
                <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-blue-400" />
              </div>
              <div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-16 h-16 md:w-24 md:h-24 card-gradient rounded-lg md:rounded-xl shadow-lg flex items-center justify-center float-animation"
                style={{ animationDelay: "2.5s" }}
              >
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-green-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
