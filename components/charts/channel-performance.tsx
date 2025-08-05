"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const performanceData = [
  { channel: "Google Ads", spend: 15420, revenue: 42350, roas: 2.75 },
  { channel: "Facebook", spend: 12800, revenue: 38940, roas: 3.04 },
  { channel: "Instagram", spend: 8950, revenue: 24680, roas: 2.76 },
  { channel: "TikTok", spend: 6200, revenue: 18730, roas: 3.02 },
  { channel: "YouTube", spend: 4800, revenue: 12960, roas: 2.7 },
  { channel: "LinkedIn", spend: 3200, revenue: 7680, roas: 2.4 },
]

function ChannelPerformance() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      labels: performanceData.map((item) => item.channel),
      datasets: [
        {
          label: "Spend",
          data: performanceData.map((item) => item.spend),
          backgroundColor: "#ef4444",
          borderColor: "#ef4444",
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: "Revenue",
          data: performanceData.map((item) => item.revenue),
          backgroundColor: "#10b981",
          borderColor: "#10b981",
          borderWidth: 1,
          borderRadius: 4,
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
          position: "top" as const,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
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
            label: (context: any) => `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: "#f0f0f0",
            drawBorder: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
            maxRotation: 45,
          },
        },
        y: {
          grid: {
            color: "#f0f0f0",
            drawBorder: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
            callback: (value: any) => "$" + value.toLocaleString(),
          },
        },
      },
    }),
    [],
  )

  if (loading) {
    return <ChartSkeleton height="h-80" />
  }

  return (
    <Card className="border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Channel Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(ChannelPerformance)
