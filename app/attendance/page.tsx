"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Upload, AlertTriangle, TrendingUp, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const subjectAttendanceData = [
  {
    subject: "Mathematics",
    totalClasses: 45,
    attendedClasses: 38,
    percentage: 84,
    recentAttendance: [
      { date: "2024-01-15", status: "present" },
      { date: "2024-01-12", status: "present" },
      { date: "2024-01-10", status: "absent" },
      { date: "2024-01-08", status: "present" },
      { date: "2024-01-05", status: "present" },
    ],
  },
  {
    subject: "Physics",
    totalClasses: 40,
    attendedClasses: 32,
    percentage: 80,
    recentAttendance: [
      { date: "2024-01-14", status: "present" },
      { date: "2024-01-11", status: "present" },
      { date: "2024-01-09", status: "present" },
      { date: "2024-01-07", status: "absent" },
      { date: "2024-01-04", status: "present" },
    ],
  },
  {
    subject: "Chemistry",
    totalClasses: 38,
    attendedClasses: 28,
    percentage: 74,
    recentAttendance: [
      { date: "2024-01-13", status: "absent" },
      { date: "2024-01-10", status: "present" },
      { date: "2024-01-08", status: "absent" },
      { date: "2024-01-06", status: "present" },
      { date: "2024-01-03", status: "present" },
    ],
  },
  {
    subject: "History",
    totalClasses: 35,
    attendedClasses: 30,
    percentage: 86,
    recentAttendance: [
      { date: "2024-01-12", status: "present" },
      { date: "2024-01-09", status: "present" },
      { date: "2024-01-07", status: "present" },
      { date: "2024-01-05", status: "present" },
      { date: "2024-01-02", status: "absent" },
    ],
  },
  {
    subject: "English",
    totalClasses: 42,
    attendedClasses: 35,
    percentage: 83,
    recentAttendance: [
      { date: "2024-01-11", status: "present" },
      { date: "2024-01-08", status: "present" },
      { date: "2024-01-06", status: "absent" },
      { date: "2024-01-04", status: "present" },
      { date: "2024-01-01", status: "present" },
    ],
  },
]

const monthlySubjectStats = {
  Mathematics: { jan: 84, dec: 88, nov: 90, oct: 85 },
  Physics: { jan: 80, dec: 82, nov: 85, oct: 79 },
  Chemistry: { jan: 74, dec: 76, nov: 78, oct: 72 },
  History: { jan: 86, dec: 89, nov: 91, oct: 88 },
  English: { jan: 83, dec: 85, nov: 87, oct: 81 },
}

export default function AttendancePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  // Calculate overall attendance from all subjects
  const overallAttendance = Math.round(
    subjectAttendanceData.reduce((sum, subject) => sum + subject.percentage, 0) / subjectAttendanceData.length,
  )

  // Find subjects below threshold
  const lowAttendanceSubjects = subjectAttendanceData.filter((subject) => subject.percentage < 80)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />

        <div className="flex-1 space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Attendance Tracker</h1>
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400">Monitor your attendance for each subject</p>
          </div>

          {/* Alert for low attendance subjects */}
          {lowAttendanceSubjects.length > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-xs md:text-sm text-red-800 dark:text-red-200">
                Low attendance alert: {lowAttendanceSubjects.map((s) => s.subject).join(", ")} below 80% threshold
              </AlertDescription>
            </Alert>
          )}

          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-lg md:text-xl">Overall Average</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{overallAttendance}%</div>
                <Progress value={overallAttendance} className="h-3 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Total Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">
                  {subjectAttendanceData.reduce((sum, subject) => sum + subject.totalClasses, 0)}
                </div>
                <p className="text-sm text-gray-500">Across all subjects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Classes Attended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-green-600">
                  {subjectAttendanceData.reduce((sum, subject) => sum + subject.attendedClasses, 0)}
                </div>
                <p className="text-sm text-gray-500">Total present</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Classes Missed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold text-red-600">
                  {subjectAttendanceData.reduce(
                    (sum, subject) => sum + (subject.totalClasses - subject.attendedClasses),
                    0,
                  )}
                </div>
                <p className="text-sm text-gray-500">Total absent</p>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Attendance */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subject-wise Attendance</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subjectAttendanceData.map((subject, index) => (
                <Card key={index} className={subject.percentage < 75 ? "border-red-200 dark:border-red-800" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            subject.percentage >= 90
                              ? "bg-green-500"
                              : subject.percentage >= 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        />
                        <span className="text-lg md:text-xl">{subject.subject}</span>
                      </CardTitle>
                      <Badge variant={subject.percentage >= 80 ? "default" : "destructive"}>
                        {subject.percentage}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attendance Progress</span>
                        <span>
                          {subject.attendedClasses}/{subject.totalClasses} classes
                        </span>
                      </div>
                      <Progress value={subject.percentage} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded">
                        <p className="font-bold text-green-600">{subject.attendedClasses}</p>
                        <p className="text-green-600">Present</p>
                      </div>
                      <div className="text-center p-2 bg-red-50 dark:bg-red-950 rounded">
                        <p className="font-bold text-red-600">{subject.totalClasses - subject.attendedClasses}</p>
                        <p className="text-red-600">Absent</p>
                      </div>
                    </div>

                    {/* Recent attendance for this subject */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recent Classes:</p>
                      <div className="flex space-x-1">
                        {subject.recentAttendance.map((record, idx) => (
                          <div
                            key={idx}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              record.status === "present" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                            title={`${record.date} - ${record.status}`}
                          >
                            {record.status === "present" ? "P" : "A"}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upload Timetable Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Timetable</span>
              </CardTitle>
              <CardDescription>Upload your class schedule to track attendance automatically</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <Input
                  type="file"
                  accept=".pdf,.xlsx,.xls,.jpg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="timetable-upload"
                />
                <label htmlFor="timetable-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-2">PDF, Excel, or Image files</p>
              </div>

              {selectedFile && (
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">{selectedFile.name}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Ready to upload</p>
                </div>
              )}

              <Button className="w-full" disabled={!selectedFile}>
                Upload Timetable
              </Button>
            </CardContent>
          </Card>

          {/* Monthly Trends by Subject */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Monthly Trends by Subject</span>
              </CardTitle>
              <CardDescription>Track attendance patterns for each subject over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(monthlySubjectStats).map(([subject, stats]) => (
                  <div key={subject} className="space-y-3">
                    <h3 className="font-medium">{subject}</h3>
                    <div className="space-y-2">
                      {Object.entries(stats).map(([month, percentage]) => (
                        <div key={month} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{month}</span>
                            <span>{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
