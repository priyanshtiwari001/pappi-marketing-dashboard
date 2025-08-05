"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import MetricCardSkeleton from "./skeletons/metric-card-skeleton"

const metrics = [
  {
    title: "Total Spend",
    value: "$1,329",
    period: "from last 7 days",
    change: "+8.2%",
    trend: "up",
  },
  {
    title: "Total Revenue",
    value: "$5,329",
    period: "from last 7 days",
    change: "+12.5%",
    trend: "up",
  },
  {
    title: "Conversion (Transactions)",
    value: "520",
    period: "from last 7 days",
    change: "-2.1%",
    trend: "down",
  },
]

export default function MetricsCards() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[...Array(3)].map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border border-gray-100 w-full">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-xs text-gray-400">{metric.period}</p>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center space-x-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`text-md ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
