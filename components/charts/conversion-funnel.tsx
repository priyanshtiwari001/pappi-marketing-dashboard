"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const funnelData = [
  { stage: "Impressions", value: 125000, percentage: 100 },
  { stage: "Clicks", value: 8750, percentage: 7.0 },
  { stage: "Visits", value: 7200, percentage: 5.8 },
  { stage: "Add to Cart", value: 2160, percentage: 1.7 },
  { stage: "Checkout", value: 1080, percentage: 0.9 },
  { stage: "Purchase", value: 864, percentage: 0.7 },
]

function ConversionFunnel() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      labels: funnelData.map((item) => item.stage),
      datasets: [
        {
          label: "Count",
          data: funnelData.map((item) => item.value),
          backgroundColor: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#3730a3"],
          borderColor: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#3730a3"],
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    }),
    [],
  )

  const chartOptions = useMemo(
    () => ({
      indexAxis: "y" as const,
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "white",
          titleColor: "#374151",
          bodyColor: "#374151",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          cornerRadius: 8,
          callbacks: {
            label: (context: any) => `Count: ${context.parsed.x.toLocaleString()}`,
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
            callback: (value: any) => value.toLocaleString(),
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
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
        <CardTitle className="text-lg font-semibold text-gray-900">Conversion Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(ConversionFunnel)
