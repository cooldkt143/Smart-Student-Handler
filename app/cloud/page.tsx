"use client"

import { useState, useEffect, useRef } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cloud, Upload, File } from "lucide-react"

type AzureFile = {
  name: string
  url: string
}

export default function CloudStoragePage() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<AzureFile[]>([])
  const [uploading, setUploading] = useState<{ name: string; progress: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Fetch existing files from Azure
  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/files")
      const data = await res.json()
      // Make sure the response always matches AzureFile[]
      const normalized: AzureFile[] = (data || []).map((f: any) => ({
        name: f.name || f.fileName || "unknown",
        url: f.url || f.fileUrl || "#",
      }))
      setFiles(normalized)
    } catch (error) {
      console.error("Error fetching files:", error)
      setFiles([])
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const uploadFile = async (file: File) => {
    setUploading({ name: file.name, progress: 0 })

    const formData = new FormData()
    formData.append("file", file)

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/api/upload", true)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100)
        setUploading({ name: file.name, progress: percent })
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        setUploading({ name: file.name, progress: 100 })
        setTimeout(() => setUploading(null), 800)
        fetchFiles()
      } else {
        console.error("Upload failed:", xhr.responseText)
        setUploading(null)
      }
    }

    xhr.onerror = () => {
      console.error("Upload failed (network error)")
      setUploading(null)
    }

    xhr.send(formData)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        uploadFile(e.dataTransfer.files[i])
      }
    }
  }

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        uploadFile(e.target.files[i])
      }
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />

        <div className="flex-1 space-y-6 p-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">Cloud Storage</h1>
            <p className="text-sm md:text-xl text-gray-600 dark:text-gray-400">
              Upload & manage your study files from Azure
            </p>
          </div>

          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span className="text-xl md:text-2xl">Upload Files</span>
              </CardTitle>
              <CardDescription>Drag & drop or select files to upload</CardDescription>
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
                <p className="text-sm text-gray-500 mb-4">or click below to browse</p>
                {/* Hidden input with ref */}
                <Input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleBrowse}
                />
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>

              {/* Progress Bar */}
              {uploading && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">{uploading.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-200"
                      style={{ width: `${uploading.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">{uploading.progress}%</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Files List */}
          <Card>
            <CardHeader>
              <CardTitle>Files in Azure</CardTitle>
              <CardDescription>All uploaded files</CardDescription>
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <p className="text-gray-500">No files uploaded yet</p>
              ) : (
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <File className="h-6 w-6 text-blue-600" />
                        <p className="font-medium">{file.name}</p>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
