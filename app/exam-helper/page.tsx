"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileQuestion, BookOpen, TrendingDown, Target, Upload, FileText, Brain, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Mock cloud files data
const cloudFiles = [
  { id: 1, name: "Mathematics Notes Chapter 1-5.pdf", subject: "Mathematics", type: "notes", size: "2.4 MB" },
  {
    id: 2,
    name: "Physics Previous Year Papers 2020-2023.pdf",
    subject: "Physics",
    type: "previous_papers",
    size: "3.8 MB",
  },
  { id: 3, name: "Chemistry Question Bank.pdf", subject: "Chemistry", type: "question_bank", size: "1.9 MB" },
  {
    id: 4,
    name: "Math Previous Papers 2019-2023.pdf",
    subject: "Mathematics",
    type: "previous_papers",
    size: "4.2 MB",
  },
  { id: 5, name: "History Study Material.docx", subject: "History", type: "notes", size: "1.5 MB" },
  { id: 6, name: "English Grammar Guide.pdf", subject: "English", type: "notes", size: "2.1 MB" },
  { id: 7, name: "Physics Lab Manual.pdf", subject: "Physics", type: "lab_manual", size: "3.2 MB" },
  {
    id: 8,
    name: "Chemistry Previous Papers 2021-2023.pdf",
    subject: "Chemistry",
    type: "previous_papers",
    size: "2.7 MB",
  },
]

const testTemplates = [
  { id: 1, name: "Mid-term Exam", duration: "2 hours", questions: 50, pattern: "Mixed (MCQ + Descriptive)" },
  { id: 2, name: "Final Exam", duration: "3 hours", questions: 75, pattern: "Comprehensive" },
  { id: 3, name: "Quick Quiz", duration: "30 minutes", questions: 20, pattern: "MCQ Only" },
  { id: 4, name: "Practice Test", duration: "1.5 hours", questions: 40, pattern: "Previous Year Style" },
]

const generatedTests = [
  {
    id: 1,
    title: "Mathematics Mock Test - Calculus Focus",
    subject: "Mathematics",
    questions: 45,
    duration: "2h 30m",
    difficulty: "Medium",
    status: "Ready",
    score: null,
    generatedFrom: ["Math Previous Papers 2019-2023.pdf", "Mathematics Notes Chapter 1-5.pdf"],
  },
  {
    id: 2,
    title: "Physics Comprehensive Test",
    subject: "Physics",
    questions: 60,
    duration: "3h 00m",
    difficulty: "Hard",
    status: "Completed",
    score: 78,
    generatedFrom: ["Physics Previous Year Papers 2020-2023.pdf", "Physics Lab Manual.pdf"],
  },
]

export default function ExamHelperPage() {
  const [testPrompt, setTestPrompt] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("create-test")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const handleFileSelection = (fileId: number) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleGenerateTest = async () => {
    if (!testPrompt.trim() || selectedFiles.length === 0) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI processing steps
    const steps = [
      "Analyzing your prompt...",
      "Processing uploaded files...",
      "Extracting patterns from previous papers...",
      "Analyzing cloud storage files...",
      "Generating questions based on patterns...",
      "Finalizing test structure...",
      "Test ready!",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    setIsGenerating(false)
    setActiveTab("generated-tests")
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "previous_papers":
        return <FileQuestion className="h-4 w-4 text-blue-600" />
      case "notes":
        return <BookOpen className="h-4 w-4 text-green-600" />
      case "question_bank":
        return <Target className="h-4 w-4 text-purple-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredCloudFiles = selectedSubject
    ? cloudFiles.filter((file) => file.subject === selectedSubject)
    : cloudFiles

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />

        <div className="flex-1 space-y-6 p-6 mobile-safe-area">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Exam Helper</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create personalized tests using AI analysis of your study materials and previous papers
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger className="text-xs md:text-sm" value="create-test">Create Test</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="generated-tests">My Tests</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="analysis">Performance</TabsTrigger>
              <TabsTrigger className="text-xs md:text-sm" value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="create-test" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-6">
                {/* Test Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5" />
                      <span>Test Configuration</span>
                    </CardTitle>
                    <CardDescription>Describe what kind of test you want to create</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-prompt">Test Description</Label>
                      <Textarea
                        id="test-prompt"
                        placeholder="Example: Create a mid-term exam for calculus covering derivatives and integrals, with 40% MCQ and 60% descriptive questions, medium difficulty level, focusing on application-based problems similar to previous year papers..."
                        value={testPrompt}
                        onChange={(e) => setTestPrompt(e.target.value)}
                        className="min-h-auto md:min-h-auto text-xs md:text-sm w-full resize-none opacity-60 focus:opacity-100 transition-opacity"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                          <SelectTrigger className="no-transition">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-xl no-transition">
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="template">Template (Optional)</Label>
                        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                          <SelectTrigger className="no-transition">
                            <SelectValue placeholder="Choose template" />
                          </SelectTrigger>
                          <SelectContent className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-white/20 shadow-xl no-transition">
                            {testTemplates.map((template) => (
                              <SelectItem key={template.id} value={template.id.toString()}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* File Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="h-5 w-5" />
                      <span className="text-lg md:text-xl">Upload Question Papers</span>
                    </CardTitle>
                    <CardDescription className="text-sm md:text-lg">Upload previous year papers or question patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="paper-upload"
                      />
                      <label htmlFor="paper-upload" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>Upload Files</span>
                        </Button>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, or Image files</p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Files:</Label>
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded"
                          >
                            <span className="text-sm">{file.name}</span>
                            <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(1)} MB</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Cloud Files Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span className="text-lg md:text-xl">Select from Cloud Storage</span>
                  </CardTitle>
                  <CardDescription>Choose relevant files from your cloud storage for test generation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCloudFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedFiles.includes(file.id)
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => handleFileSelection(file.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleFileSelection(file.id)}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {getFileIcon(file.type)}
                              <span className="text-sm font-medium truncate">{file.name}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <Badge variant="outline" className="text-xs">
                                {file.subject}
                              </Badge>
                              <span>{file.size}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        {selectedFiles.length} files selected for analysis
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Card>
                <CardContent className="pt-6">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-blue-600 animate-pulse" />
                        <span className="font-medium">Generating your personalized test...</span>
                      </div>
                      <Progress value={generationProgress} className="h-3" />
                      <p className="text-sm text-gray-600">
                        AI is analyzing {selectedFiles.length} files and your requirements
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={handleGenerateTest}
                      disabled={!testPrompt.trim() || selectedFiles.length === 0}
                      className="w-full"
                      size="lg"
                    >
                      <Brain className="h-5 w-5 mr-2" />
                      Generate AI Test
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="generated-tests" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-6">
                {generatedTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{test.title}</CardTitle>
                          <CardDescription>{test.subject}</CardDescription>
                        </div>
                        <Badge variant={test.status === "Ready" ? "default" : "secondary"}>{test.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-medium">{test.questions}</p>
                          <p className="text-gray-500">Questions</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{test.duration}</p>
                          <p className="text-gray-500">Duration</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{test.difficulty}</p>
                          <p className="text-gray-500">Difficulty</p>
                        </div>
                      </div>

                      {test.score && (
                        <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                          <p className="text-sm font-medium text-green-800 dark:text-green-200">Score: {test.score}%</p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-600">Generated from:</p>
                        <div className="flex flex-wrap gap-1">
                          {test.generatedFrom.map((file, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {file}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button className="flex-1" disabled={test.status !== "Ready"}>
                          {test.status === "Ready" ? "Start Test" : "View Results"}
                        </Button>
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {/* Performance analysis content - keeping existing weak topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    <span>AI-Generated Insights</span>
                  </CardTitle>
                  <CardDescription>Based on your test performance and study materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Pattern Analysis</h3>
                      <p className="text-sm text-gray-600">
                        AI detected that 60% of previous year questions focus on application-based problems. Your recent
                        tests show 23% lower performance in these areas.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Recommendation</h3>
                      <p className="text-sm text-gray-600">
                        Focus on Chapter 5-7 of your Mathematics notes. Practice more numerical problems from the
                        uploaded question banks.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {testTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.pattern}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium">{template.duration}</p>
                          <p className="text-gray-500">Duration</p>
                        </div>
                        <div>
                          <p className="font-medium">{template.questions}</p>
                          <p className="text-gray-500">Questions</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => {
                          setSelectedTemplate(template.id.toString())
                          setActiveTab("create-test")
                        }}
                      >
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
