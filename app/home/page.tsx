"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Search, TrendingUp, AlertTriangle, BookOpen } from "lucide-react"

const recentFiles = [
  { name: "Mathematics Notes.pdf", subject: "Math", date: "2024-01-15", size: "2.4 MB" },
  { name: "Physics Lab Report.docx", subject: "Physics", date: "2024-01-14", size: "1.8 MB" },
  { name: "Chemistry Formulas.pdf", subject: "Chemistry", date: "2024-01-13", size: "3.2 MB" },
  { name: "History Timeline.pptx", subject: "History", date: "2024-01-12", size: "5.1 MB" },
  { name: "English Essay.docx", subject: "English", date: "2024-01-11", size: "1.2 MB" },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const attendancePercentage = 78

  return (
    <SidebarProvider>
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <SidebarInset>
        <TopNavbar />

        <div className="flex-1 space-y-4 md:space-y-6 p-4 md:p-6 mobile-safe-area">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Student!</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Here's your academic overview for today
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 md:gap-6">
            <Card className="card-mobile">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Attendance</CardTitle>
                <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">{attendancePercentage}%</div>
                <div className="space-y-2">
                  <Progress value={attendancePercentage} className="h-2" />
                  {attendancePercentage < 80 && (
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-2 w-2 md:h-3 md:w-3 text-red-500" />
                      <p className="text-xs text-red-500">Below threshold</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="card-mobile">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Files Stored</CardTitle>
                <FileText className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+12 from last week</p>
              </CardContent>
            </Card>

            <Card className="card-mobile">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Mock Tests</CardTitle>
                <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Average score: 85%</p>
              </CardContent>
            </Card>

            <Card className="card-mobile">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium">Study Hours</CardTitle>
                <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold">42h</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Recent Files */}
            <Card className="card-mobile">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Recent Files</CardTitle>
                <CardDescription className="text-sm">Your latest uploaded study materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {recentFiles.slice(0, 5).map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                        <FileText className="h-6 w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-xs md:text-sm truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {file.date} • {file.size}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                        {file.subject}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick AI Search */}
            <Card className="card-mobile">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Quick AI Search</CardTitle>
                <CardDescription className="text-sm">Ask anything about your study materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask AI about your studies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 text-sm"
                    />
                    <Button size="sm" className="flex-shrink-0">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Suggested questions:</p>
                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" className="justify-start h-auto p-2 text-left w-full text-xs">
                        "Explain quantum mechanics from my physics notes"
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start h-auto p-2 text-left w-full text-xs">
                        "Create a summary of my history timeline"
                      </Button>
                      <Button variant="ghost" size="sm" className="justify-start h-auto p-2 text-left w-full text-xs">
                        "Generate practice questions for mathematics"
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
