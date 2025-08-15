"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import {
  Search,
  Moon,
  Sun,
  Bell,
  User,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  HelpCircle,
  GraduationCap,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john.doe@student.edu",
  avatar: "/placeholder.svg?height=32&width=32&text=JD",
  isSignedIn: true,
}

// Mock notifications data
const notifications = [
  {
    id: 1,
    title: "Assignment Due Tomorrow",
    message: "Mathematics assignment on Calculus is due tomorrow at 11:59 PM",
    time: "2 hours ago",
    type: "deadline",
    read: false,
  },
  {
    id: 2,
    title: "New Mock Test Available",
    message: "Physics mock test has been generated based on your recent uploads",
    time: "4 hours ago",
    type: "test",
    read: false,
  },
  {
    id: 3,
    title: "Attendance Alert",
    message: "Your Chemistry attendance is below 80%. Current: 74%",
    time: "1 day ago",
    type: "attendance",
    read: false,
  },
  {
    id: 4,
    title: "File Uploaded Successfully",
    message: "History notes have been uploaded to your cloud storage",
    time: "2 days ago",
    type: "upload",
    read: true,
  },
  {
    id: 5,
    title: "Study Reminder",
    message: "You haven't studied Physics for 3 days. Time to catch up!",
    time: "3 days ago",
    type: "reminder",
    read: true,
  },
]

export function TopNavbar() {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState(mockUser)
  const [notificationSettings, setNotificationSettings] = useState({
    assignments: true,
    attendance: true,
    tests: true,
    uploads: false,
    reminders: true,
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return "🕒"
      case "test":
        return "📝"
      case "attendance":
        return "⚠️"
      case "upload":
        return "📁"
      case "reminder":
        return "💡"
      default:
        return "🔔"
    }
  }

  const handleSignOut = () => {
    setUser({ ...user, isSignedIn: false })
  }

  const handleSignIn = () => {
    setUser({ ...user, isSignedIn: true })
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b header-gradient">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 items-center gap-4 p-4">
        <SidebarTrigger className="-ml-1" />

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-green-200 dark:border-blue-600 focus:border-green-400 dark:focus:border-blue-400"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-green-100 dark:hover:bg-blue-900">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center badge-gradient">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 p-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
              align="end"
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg gradient-text-light dark:gradient-text-dark">Notifications</CardTitle>
                    <Badge variant="secondary" className="badge-gradient">
                      {unreadCount} new
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b last:border-b-0 hover:bg-green-50 dark:hover:bg-blue-900 transition-colors ${
                          !notification.read ? "bg-green-50 dark:bg-blue-950" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notification.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-green-600 dark:bg-blue-600 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <Button variant="ghost" className="w-full text-sm hover:bg-green-100 dark:hover:bg-blue-900">
                      View All Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-green-100 dark:hover:bg-blue-900">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
            >
              <DropdownMenuLabel className="gradient-text-light dark:gradient-text-dark">Theme</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-green-100 dark:hover:bg-blue-900">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-green-100 dark:hover:bg-blue-900">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="hover:bg-green-100 dark:hover:bg-blue-900"
              >
                <Settings className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {user.isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hover:bg-green-100 dark:hover:bg-blue-900 border-2 border-transparent hover:border-green-300 dark:hover:border-blue-400 transition-all duration-200"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-green-400 dark:ring-blue-400 ring-offset-1 ring-offset-white dark:ring-offset-gray-900">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 dark:from-blue-400 dark:to-blue-600 text-white font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none gradient-text-light dark:gradient-text-dark">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Profile Settings */}
                <DropdownMenuItem
                  className="hover:bg-green-100 dark:hover:bg-blue-900 cursor-pointer"
                  onClick={() => (window.location.href = "/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                {/* Settings with Notification Preferences */}
                <Popover>
                  <PopoverTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="hover:bg-green-100 dark:hover:bg-blue-900"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
                    side="left"
                    align="start"
                  >
                    <Card className="border-0 shadow-none bg-transparent">
                      <CardHeader>
                        <CardTitle className="text-lg gradient-text-light dark:gradient-text-dark">Settings</CardTitle>
                        <CardDescription>Manage your preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium gradient-text-light dark:gradient-text-dark">
                            Notification Preferences
                          </h4>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="assignments" className="text-sm">
                              Assignment Reminders
                            </Label>
                            <Switch
                              id="assignments"
                              checked={notificationSettings.assignments}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, assignments: checked }))
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="attendance" className="text-sm">
                              Attendance Alerts
                            </Label>
                            <Switch
                              id="attendance"
                              checked={notificationSettings.attendance}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, attendance: checked }))
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="tests" className="text-sm">
                              Test Notifications
                            </Label>
                            <Switch
                              id="tests"
                              checked={notificationSettings.tests}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, tests: checked }))
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="uploads" className="text-sm">
                              Upload Confirmations
                            </Label>
                            <Switch
                              id="uploads"
                              checked={notificationSettings.uploads}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, uploads: checked }))
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="reminders" className="text-sm">
                              Study Reminders
                            </Label>
                            <Switch
                              id="reminders"
                              checked={notificationSettings.reminders}
                              onCheckedChange={(checked) =>
                                setNotificationSettings((prev) => ({ ...prev, reminders: checked }))
                              }
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </PopoverContent>
                </Popover>

                <DropdownMenuItem className="hover:bg-green-100 dark:hover:bg-blue-900">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignIn}
                className="hover:bg-green-100 dark:hover:bg-blue-900"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
              <Button size="sm" className="btn-gradient-primary">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-1 items-center justify-between px-4 min-w-0">
        {/* Website Name - Fixed width container */}
        <div className="flex items-center space-x-2 min-w-0 flex-1 max-w-[60%]">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white flex-shrink-0">
            <GraduationCap className="size-5" />
          </div>
          <div className="flex flex-col leading-none min-w-0">
            <span className="font-semibold text-xl gradient-text-light dark:gradient-text-dark whitespace-nowrap">
              Smart Student
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Handler</span>
          </div>
        </div>

        {/* Mobile Profile Menu - Fixed width */}
        <div className="flex-shrink-0 pt-2">
          {user.isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0 overflow-hidden hover:border-green-300 dark:hover:border-blue-400 border-2 border-transparent transition-all duration-200"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 dark:from-blue-400 dark:to-blue-600 text-white font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-green-200/50 dark:border-blue-600/50 shadow-xl no-transition"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none gradient-text-light dark:gradient-text-dark">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Notifications */}
                <DropdownMenuItem className="hover:bg-green-100 dark:hover:bg-blue-900">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge className="ml-auto h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center badge-gradient">
                      {unreadCount}
                    </Badge>
                  )}
                </DropdownMenuItem>

                {/* Theme Toggle */}
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-green-100 dark:hover:bg-blue-900"
                >
                  {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </DropdownMenuItem>

                {/* Profile Settings */}
                <DropdownMenuItem
                  className="hover:bg-green-100 dark:hover:bg-blue-900 cursor-pointer"
                  onClick={() => (window.location.href = "/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="hover:bg-red-100 dark:hover:bg-red-900 text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignIn}
                className="hover:bg-green-100 dark:hover:bg-blue-900"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
