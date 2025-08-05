"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

const articles = [
  {
    title: "How to insert URL tracking in Google Ads",
    image: "/images/image1.jpg",
    link: "https://support.google.com/google-ads/answer/6076199?hl=en"
  },
  {
    title: "What Google isn't telling you about signal loss",
    image: "/images/image2.jpeg",
  },
  {
    title: "Your Media plan is stuck in Excel hell",
    image: "/images/image3.jpeg",
  },
  {
    title: "The future of performance marketing is agnostic",
     image: "/images/image4.jpeg",
  },
]

function NewestLearningSkeleton() {
  return (
    <Card className="border border-gray-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Newest learning</CardTitle>
          <Skeleton className="h-4 w-16" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function NewestLearning() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <NewestLearningSkeleton />
  }

  return (
    <Card className="border border-gray-100">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Newest learning</CardTitle>
          <Button variant="ghost" className="text-sm text-gray-500 hover:text-gray-700 p-0">
            Read all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={200}
                    height={120}
                    className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
