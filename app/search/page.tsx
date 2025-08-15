"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Copy, Download, Filter, FileText, Globe, BookOpen } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

const searchResults = [
  {
    id: 1,
    question: "Explain the concept of quantum entanglement",
    answer:
      "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others...",
    source: "Physics Notes - Chapter 12.pdf",
    confidence: 95,
    type: "pdf",
  },
  {
    id: 2,
    question: "What are the main causes of World War I?",
    answer:
      "The main causes of World War I include: 1) Militarism - the arms race between European powers, 2) Alliance system - complex web of alliances that divided Europe, 3) Imperialism - competition for colonies and resources...",
    source: "History Timeline.docx",
    confidence: 88,
    type: "document",
  },
  {
    id: 3,
    question: "Solve the differential equation dy/dx = 2x",
    answer:
      "To solve the differential equation dy/dx = 2x, we integrate both sides: ∫dy = ∫2x dx. This gives us y = x² + C, where C is the constant of integration...",
    source: "Calculus Notes.pdf",
    confidence: 92,
    type: "pdf",
  },
]

const recentQueries = [
  "Explain photosynthesis process",
  "What is the derivative of sin(x)?",
  "Causes of French Revolution",
  "Organic chemistry reactions",
  "Newton's laws of motion",
]

export default function AISearchPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState(searchResults)
  const [filters, setFilters] = useState({
    pdfs: true,
    syllabus: true,
    web: false,
  })

  const handleSearch = () => {
    if (!query.trim()) return

    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      // In real app, this would be actual search results
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "document":
        return <BookOpen className="h-4 w-4 text-blue-500" />
      case "web":
        return <Globe className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <SidebarProvider>
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <SidebarInset>
        <TopNavbar />

        <div className="flex-1 space-y-4 md:space-y-6 p-4 md:p-6 mobile-safe-area overflow-x-hidden">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">AI Search</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Ask questions about your study materials and get AI-powered answers
            </p>
          </div>

          {/* Search Section */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                <Search className="h-5 w-5" />
                <span>Ask AI</span>
              </CardTitle>
              <CardDescription className="text-sm">Type your question in natural language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="Ask anything about your study materials... e.g., 'Explain the concept of photosynthesis' or 'What are the main themes in Romeo and Juliet?'"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-auto md:min-h-auto text-xs md:text-sm w-full resize-none opacity-60 focus:opacity-100 transition-opacity"
                />

                {/* Filters */}
                <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-6">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Search in:</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pdfs"
                        checked={filters.pdfs}
                        onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, pdfs: checked as boolean }))}
                      />
                      <label htmlFor="pdfs" className="text-sm">
                        PDFs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="syllabus"
                        checked={filters.syllabus}
                        onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, syllabus: checked as boolean }))}
                      />
                      <label htmlFor="syllabus" className="text-sm">
                        Syllabus
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="web"
                        checked={filters.web}
                        onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, web: checked as boolean }))}
                      />
                      <label htmlFor="web" className="text-sm">
                        Web
                      </label>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSearch} disabled={!query.trim() || isSearching} className="w-full">
                  {isSearching ? "Searching..." : "Search"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-6">
            {/* Recent Queries */}
            <Card className="lg:col-span-1 w-full">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">Recent Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentQueries.map((recentQuery, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-2 text-xs md:text-sm"
                      onClick={() => setQuery(recentQuery)}
                    >
                      <span className="truncate">{recentQuery}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="lg:col-span-3 space-y-4 w-full">
              {results.map((result) => (
                <Card key={result.id} className="w-full">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start justify-between space-y-2 md:space-y-0">
                      <CardTitle className="text-base md:text-lg pr-0 md:pr-2">{result.question}</CardTitle>
                      <Badge variant="secondary" className="self-start md:ml-2 flex-shrink-0">
                        {result.confidence}% confident
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                      {result.answer}
                    </p>

                    <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t space-y-3 md:space-y-0">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {getSourceIcon(result.type)}
                        <span className="truncate">Source: {result.source}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(result.answer)}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {results.length === 0 && (
                <Card className="w-full">
                  <CardContent className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No search results yet</h3>
                    <p className="text-gray-500">Ask a question to get AI-powered answers from your study materials</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
