"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const attributionData = [
  { touchpoint: "First Click", attribution: 25 },
  { touchpoint: "Last Click", attribution: 35 },
  { touchpoint: "Linear", attribution: 20 },
  { touchpoint: "Time Decay", attribution: 15 },
  { touchpoint: "Position Based", attribution: 5 },
]

function AttributionModel() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3200)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      labels: attributionData.map((item) => item.touchpoint),
      datasets: [
        {
          label: "Attribution %",
          data: attributionData.map((item) => item.attribution),
          backgroundColor: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95"],
          borderColor: ["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95"],
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
            label: (context: any) => `Attribution: ${context.parsed.y}%`,
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
            callback: (value: any) => value + "%",
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
        <CardTitle className="text-lg font-semibold text-gray-900">Attribution Model Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(AttributionModel)
