"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(ArcElement, Tooltip, Legend)

const segmentData = [
  { name: "New Visitors", value: 35, color: "#3b82f6" },
  { name: "Returning Customers", value: 28, color: "#10b981" },
  { name: "Loyal Customers", value: 22, color: "#f59e0b" },
  { name: "At-Risk", value: 10, color: "#ef4444" },
  { name: "Churned", value: 5, color: "#6b7280" },
]

function AudienceSegments() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      labels: segmentData.map((item) => item.name),
      datasets: [
        {
          data: segmentData.map((item) => item.value),
          backgroundColor: segmentData.map((item) => item.color),
          borderColor: segmentData.map((item) => item.color),
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverOffset: 4,
        },
      ],
    }),
    [],
  )

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
            },
            generateLabels: (chart: any) => {
              const data = chart.data
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label: string, i: number) => {
                  const value = data.datasets[0].data[i]
                  return {
                    text: `${label}: ${value}%`,
                    fillStyle: data.datasets[0].backgroundColor[i],
                    strokeStyle: data.datasets[0].borderColor[i],
                    lineWidth: data.datasets[0].borderWidth,
                    pointStyle: "circle",
                    hidden: false,
                    index: i,
                  }
                })
              }
              return []
            },
          },
        },
        tooltip: {
          backgroundColor: "white",
          titleColor: "#374151",
          bodyColor: "#374151",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: (context: any) => `${context.label}: ${context.parsed}%`,
          },
        },
      },
      cutout: "50%",
    }),
    [],
  )

  if (loading) {
    return <ChartSkeleton height="h-80" showLegend />
  }

  return (
    <Card className="border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Audience Segments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(AudienceSegments)
