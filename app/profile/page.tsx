"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Award, Camera, Edit3, Save, X, Trash2, Plus, User, Mail, Phone, MapPin, Calendar,
  BookOpen, BarChart3, Bell, Settings, Shield
} from "lucide-react"


export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<any>(null)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    assignments: true,
    grades: true,
    attendance: true,
  })

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => { setUserData(data); setEditedData(data) })
      .catch(err => console.error("Error loading profile:", err))
  }, [])

  const handleSave = async () => {
    setUserData(editedData)
    setIsEditing(false)
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedData),
    })
  }

  const handleCancel = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setEditedData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const updated = [...editedData.achievements]
    updated[index][field] = value
    setEditedData((prev: any) => ({ ...prev, achievements: updated }))
  }

  const addAchievement = () => {
    setEditedData((prev: any) => ({
      ...prev,
      achievements: [...prev.achievements, { title: "", date: "", description: "" }]
    }))
  }

  const removeAchievement = (index: number) => {
    const updated = editedData.achievements.filter((_: any, i: number) => i !== index)
    setEditedData((prev: any) => ({ ...prev, achievements: updated }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        setEditedData((prev: any) => ({ ...prev, avatar: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (!userData) return <div className="p-6">Loading profile...</div>

  // ✅ Fix: type the accumulator and item so TS doesn't complain in CI
  const calculateOverallProgress = () => {
    if (!userData || !userData.subjects || userData.subjects.length === 0) return 0;
    const totalProgress = userData.subjects.reduce(
      (sum: number, subject: { progress: number }) => sum + Number(subject?.progress ?? 0),
      0
    );
    return Math.round(totalProgress / userData.subjects.length);
  };

  return (
    <SidebarProvider>
      <div className="hidden md:block"><AppSidebar /></div>
      <SidebarInset>
        <TopNavbar />
        <div className="flex-1 space-y-6 p-6">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger className="text-xs md:text-sm" value="profile">Profile</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="academic">Academic</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="analytics">Analytics</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="settings">Settings</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="privacy">Privacy</TabsTrigger>
            </TabsList>

            {/* ================= PROFILE TAB ================= */}
            <TabsContent value="profile" className="space-y-6">
              {/* Profile Header */}
              <Card>
                <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32 ring-4 ring-green-400">
                      <AvatarImage src={editedData.avatar || "/placeholder.svg"} alt={userData.name} />
                      <AvatarFallback>{userData.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} id="avatarUpload" className="hidden" />
                        <label htmlFor="avatarUpload" className="absolute -bottom-2 -right-2 bg-gray-200 rounded-full p-2 cursor-pointer">
                          <Camera className="h-4 w-4" />
                        </label>
                      </>
                    )}
                  </div>

                  <div className="flex-1">
                    {isEditing ? (
                      <>
                        <Input value={editedData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                        <Input value={editedData.major} onChange={(e) => handleInputChange("major", e.target.value)} className="mt-2" />
                        <Input value={editedData.year} onChange={(e) => handleInputChange("year", e.target.value)} className="mt-2" />
                        <Input value={editedData.studentId} onChange={(e) => handleInputChange("studentId", e.target.value)} className="mt-2" />
                      </>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold">{userData.name}</h2>
                        <p>{userData.major} • {userData.year}</p>
                        <Badge variant="secondary">Student ID: {userData.studentId}</Badge>
                      </>
                    )}
                  </div>

                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}><Edit3 className="h-4 w-4 mr-2" /> Edit</Button>
                  ) : (
                    <>
                      <Button onClick={handleSave} className="mr-2"><Save className="h-4 w-4 mr-2" /> Save</Button>
                      <Button variant="outline" onClick={handleCancel}><X className="h-4 w-4 mr-2" /> Cancel</Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Personal Info */}
              <Card>
                <CardHeader><CardTitle><User className="h-5 w-5 inline mr-2" />Personal Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    {isEditing ? <Input value={editedData.name} onChange={(e) => handleInputChange("name", e.target.value)} /> : <p>{userData.name}</p>}
                  </div>
                  <div>
                    <Label>Email</Label>
                    {isEditing ? <Input value={editedData.email} onChange={(e) => handleInputChange("email", e.target.value)} /> :
                      <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /> <p>{userData.email}</p></div>}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    {isEditing ? <Input value={editedData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} /> :
                      <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /> <p>{userData.phone}</p></div>}
                  </div>
                  <div>
                    <Label>Address</Label>
                    {isEditing ? <Textarea value={editedData.address} onChange={(e) => handleInputChange("address", e.target.value)} /> :
                      <div className="flex items-start space-x-2"><MapPin className="h-4 w-4 mt-1" /> <p>{userData.address}</p></div>}
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    {isEditing ? <Input type="date" value={editedData.dateOfBirth} onChange={(e) => handleInputChange("dateOfBirth", e.target.value)} /> :
                      <div className="flex items-center space-x-2"><Calendar className="h-4 w-4" /> <p>{new Date(userData.dateOfBirth).toLocaleDateString()}</p></div>}
                  </div>
                  <div>
                    <Label>Bio</Label>
                    {isEditing ? <Textarea value={editedData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} /> : <p>{userData.bio}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader><CardTitle><Award className="h-5 w-5 inline mr-2" />Achievements</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {editedData.achievements.map((a: any, i: number) => (
                    <div
                      key={i}
                      className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg"
                    >
                      {isEditing ? (
                        <>
                          <Input value={a.title} onChange={(e) => handleAchievementChange(i, "title", e.target.value)} placeholder="Title" />
                          <Input value={a.date} onChange={(e) => handleAchievementChange(i, "date", e.target.value)} placeholder="Date" className="mt-2" />
                          <Textarea value={a.description} onChange={(e) => handleAchievementChange(i, "description", e.target.value)} placeholder="Description" className="mt-2" />
                          <Button variant="destructive" size="sm" onClick={() => removeAchievement(i)} className="mt-2"><Trash2 className="h-4 w-4" /> Remove</Button>
                        </>
                      ) : (
                        <>
                          <h3 className="font-semibold text-blue-800 dark:text-blue-200">{a.title}</h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400">{a.date}</p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">{a.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button onClick={addAchievement} variant="outline" size="sm" className="h-fit"><Plus className="h-4 w-4" /> Add Achievement</Button>
                  )}
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
                      {
                        // ✅ Fix: type the reduce accumulator/items
                        userData.subjects.reduce(
                          (sum: number, subject: { credits: number }) => sum + Number(subject?.credits ?? 0),
                          0
                        )
                      }
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
                    {userData.subjects.map((subject: any, index: number) => (
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
                    {userData.subjects.map((subject: any, index: number) => (
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
