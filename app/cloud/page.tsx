"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Cloud, Upload, Search, FolderOpen, FileText, ImageIcon, File } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const folders = [
  { name: "Mathematics", files: 23, size: "45.2 MB", color: "bg-blue-500" },
  { name: "Physics", files: 18, size: "32.1 MB", color: "bg-green-500" },
  { name: "Chemistry", files: 15, size: "28.7 MB", color: "bg-purple-500" },
  { name: "History", files: 12, size: "19.3 MB", color: "bg-orange-500" },
  { name: "English", files: 20, size: "41.8 MB", color: "bg-red-500" },
  { name: "Semester 1", files: 45, size: "89.2 MB", color: "bg-indigo-500" },
]

const recentFiles = [
  { name: "Calculus Notes.pdf", type: "pdf", size: "2.4 MB", date: "2024-01-15", folder: "Mathematics" },
  { name: "Lab Report.docx", type: "doc", size: "1.8 MB", date: "2024-01-14", folder: "Physics" },
  { name: "Periodic Table.png", type: "image", size: "856 KB", date: "2024-01-13", folder: "Chemistry" },
  { name: "Essay Draft.docx", type: "doc", size: "1.2 MB", date: "2024-01-12", folder: "English" },
  { name: "Timeline.pptx", type: "ppt", size: "5.1 MB", date: "2024-01-11", folder: "History" },
]

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-8 w-8 text-red-600" />
    case "image":
      return <ImageIcon className="h-8 w-8 text-green-600" />
    case "doc":
    case "ppt":
      return <File className="h-8 w-8 text-blue-600" />
    default:
      return <File className="h-8 w-8 text-gray-600" />
  }
}

export default function CloudStoragePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log("Files dropped:", e.dataTransfer.files)
    }
  }

  const filteredFiles = recentFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.folder.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />

        <div className="flex-1 space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Cloud Storage</h1>
            <p className="text-sm md:text-xl text-gray-600 dark:text-gray-400">Store and organize your study materials</p>
          </div>

          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span className="text-xl md:text-2xl">Upload Files</span>
              </CardTitle>
              <CardDescription>Drag and drop files or click to browse</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-gray-300 dark:border-gray-600"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Cloud className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Drop files here</h3>
                <p className="text-sm md:text-lgtext-gray-500 mb-4">or click to browse from your device</p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-gray-400 mt-2">Supports PDF, DOC, PPT, images up to 10MB</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="folders" className="space-y-6">
            <TabsList>
              <TabsTrigger value="folders">Folders</TabsTrigger>
              <TabsTrigger value="files">All Files</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="folders" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {folders.map((folder, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${folder.color} rounded-lg flex items-center justify-center`}>
                          <FolderOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{folder.name}</h3>
                          <p className="text-sm text-gray-500">
                            {folder.files} files • {folder.size}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="files" className="space-y-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {filteredFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b last:border-b-0"
                      >
                        <div className="flex items-center space-x-4">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">
                              {file.date} • {file.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{file.folder}</Badge>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recently Uploaded</CardTitle>
                  <CardDescription>Files uploaded in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentFiles.slice(0, 5).map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.date} • {file.size}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{file.folder}</Badge>
                      </div>
                    ))}
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
