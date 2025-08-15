"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3 } from "lucide-react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Settings,
  Bell,
  Shield,
  Camera,
  Edit3,
  Save,
  X,
} from "lucide-react"

// Mock user data
const mockUserData = {
  name: "John Doe",
  email: "john.doe@student.edu",
  phone: "+1 (555) 123-4567",
  address: "123 University Ave, College Town, CT 12345",
  dateOfBirth: "1998-05-15",
  studentId: "STU2024001",
  major: "Computer Science",
  year: "Senior",
  gpa: 3.7,
  avatar: "/placeholder.svg?height=128&width=128&text=JD",
  bio: "Passionate computer science student with interests in AI and machine learning. Always eager to learn new technologies and apply them to solve real-world problems.",
  joinDate: "2021-09-01",
  achievements: [
    { title: "Dean's List", date: "Fall 2023", description: "Academic excellence recognition" },
    { title: "Hackathon Winner", date: "Spring 2023", description: "First place in university hackathon" },
    { title: "Research Assistant", date: "2023-Present", description: "AI Research Lab" },
  ],
  subjects: [
    { name: "Mathematics", grade: "A", credits: 4, progress: 95 },
    { name: "Physics", grade: "A-", credits: 4, progress: 88 },
    { name: "Chemistry", grade: "B+", credits: 3, progress: 82 },
    { name: "History", grade: "A", credits: 3, progress: 92 },
    { name: "English", grade: "A-", credits: 3, progress: 87 },
  ],
}

export default function ProfilePage() {
  const [userData, setUserData] = useState(mockUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(mockUserData)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    assignments: true,
    grades: true,
    attendance: true,
  })

  const handleSave = () => {
    setUserData(editedData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateOverallProgress = () => {
    const totalProgress = userData.subjects.reduce((sum, subject) => sum + subject.progress, 0)
    return Math.round(totalProgress / userData.subjects.length)
  }

  return (
    <SidebarProvider>
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <SidebarInset>
        <TopNavbar />

        <div className="flex-1 space-y-4 md:space-y-6 p-4 md:p-6 mobile-safe-area">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger className="text-xs md:text-sm" value="profile">Profile</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="academic">Academic</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="analytics">Analytics</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="settings">Settings</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              {/* Profile Header */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-4 ring-green-400 dark:ring-blue-400">
                        <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                        <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 dark:from-blue-400 dark:to-blue-600 text-white text-xl md:text-2xl">
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                        variant="secondary"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold gradient-text-light dark:gradient-text-dark">
                            {userData.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            {userData.major} • {userData.year}
                          </p>
                        </div>
                        <div className="flex justify-center md:justify-end space-x-2 mt-2 md:mt-0">
                          {!isEditing ? (
                            <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit Profile
                            </Button>
                          ) : (
                            <div className="flex space-x-2">
                              <Button onClick={handleSave} size="sm">
                                <Save className="h-4 w-4 mr-2" />
                                Save
                              </Button>
                              <Button onClick={handleCancel} variant="outline" size="sm">
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <Badge variant="secondary">Student ID: {userData.studentId}</Badge>
                        <Badge variant="secondary">GPA: {userData.gpa}</Badge>
                        <Badge variant="secondary">Joined: {new Date(userData.joinDate).getFullYear()}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editedData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{userData.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editedData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">{userData.email}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={editedData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">{userData.phone}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      {isEditing ? (
                        <Textarea
                          id="address"
                          value={editedData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          rows={2}
                        />
                      ) : (
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">{userData.address}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      {isEditing ? (
                        <Input
                          id="dob"
                          type="date"
                          value={editedData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(userData.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editedData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={6}
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{userData.bio}</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {userData.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-blue-950 dark:to-blue-900 rounded-lg"
                      >
                        <h3 className="font-semibold text-green-800 dark:text-blue-200">{achievement.title}</h3>
                        <p className="text-sm text-green-600 dark:text-blue-400">{achievement.date}</p>
                        <p className="text-xs text-green-700 dark:text-blue-300 mt-1">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              {/* Academic Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-2xl">Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm md:text-lg">Academic Performance</span>
                        <span>{calculateOverallProgress()}%</span>
                      </div>
                      <Progress value={calculateOverallProgress()} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-2xl">Current GPA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text-light dark:gradient-text-dark">{userData.gpa}</div>
                    <p className="text-sm text-gray-500">out of 4.0</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-2xl">Total Credits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold gradient-text-light dark:gradient-text-dark">
                      {userData.subjects.reduce((sum, subject) => sum + subject.credits, 0)}
                    </div>
                    <p className="text-sm text-gray-500">credits completed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Subject Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Subject Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.subjects.map((subject, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-sm md:text-xl font-medium">{subject.name}</h3>
                            <Badge variant="outline">{subject.grade}</Badge>
                            <span className="text-sm text-gray-500">{subject.credits} credits</span>
                          </div>
                          <span className="text-sm font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {[
                  { metric: "Overall GPA", value: "3.7", change: "+0.2", trend: "up" },
                  { metric: "Attendance Rate", value: "78%", change: "-2%", trend: "down" },
                  { metric: "Study Hours/Week", value: "29.3h", change: "+3.1h", trend: "up" },
                  { metric: "Mock Test Average", value: "81%", change: "+5%", trend: "up" },
                ].map((metric, index) => (
                  <Card key={index} className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xs md:text-sm font-medium truncate pr-1">{metric.metric}</CardTitle>
                      <BarChart3
                        className={`h-3 w-3 md:h-4 md:w-4 flex-shrink-0 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg md:text-2xl font-bold">{metric.value}</div>
                      <p className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {metric.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Study Time Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span >Study Time Analysis</span>
                  </CardTitle>
                  <CardDescription>Your learning patterns and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData.subjects.map((subject, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm md:text-xl font-medium">{subject.name}</h3>
                          <Badge variant="outline">{subject.grade}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-sm md:text-lg">Progress</span>
                            <span>{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                  <CardDescription>AI-powered analysis of your academic performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Strength Areas</h3>
                      <p className="text-xs text-blue-700 dark:text-blue-300">
                        You excel in Mathematics and History with consistent high performance. Keep up the excellent
                        work!
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Areas for Improvement</h3>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">
                        Chemistry attendance needs attention. Consider scheduling more study sessions for better
                        understanding.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Recommendations</h3>
                      <p className="text-xs text-green-700 dark:text-green-300">
                        Based on your learning patterns, morning study sessions show 23% better retention rates.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span className="text-xl md:text-2xl ">Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                    />
                  </div>

                  <div className="border-t pt-4 space-y-4">
                    <h4 className="font-medium">Notification Types</h4>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="assignment-notifications">Assignment Reminders</Label>
                      <Switch
                        id="assignment-notifications"
                        checked={notifications.assignments}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, assignments: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="grade-notifications">Grade Updates</Label>
                      <Switch
                        id="grade-notifications"
                        checked={notifications.grades}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, grades: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="attendance-notifications">Attendance Alerts</Label>
                      <Switch
                        id="attendance-notifications"
                        checked={notifications.attendance}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, attendance: checked }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Account Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Download My Data
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Privacy Settings</span>
                  </CardTitle>
                  <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-visibility">Profile Visibility</Label>
                      <p className="text-sm text-gray-500">Make your profile visible to other students</p>
                    </div>
                    <Switch id="profile-visibility" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="activity-status">Activity Status</Label>
                      <p className="text-sm text-gray-500">Show when you're online</p>
                    </div>
                    <Switch id="activity-status" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-analytics">Data Analytics</Label>
                      <p className="text-sm text-gray-500">Allow anonymous usage analytics</p>
                    </div>
                    <Switch id="data-analytics" defaultChecked />
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Data Management</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm">
                        Export Personal Data
                      </Button>
                      <Button variant="outline" size="sm">
                        Clear Activity History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
