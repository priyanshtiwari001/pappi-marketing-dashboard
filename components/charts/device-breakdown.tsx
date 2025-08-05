"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(ArcElement, Tooltip, Legend)

const deviceData = [
  { name: "Desktop", value: 45, color: "#3b82f6" },
  { name: "Mobile", value: 38, color: "#10b981" },
  { name: "Tablet", value: 17, color: "#f59e0b" },
]

function DeviceBreakdown() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      labels: deviceData.map((item) => item.name),
      datasets: [
        {
          data: deviceData.map((item) => item.value),
          backgroundColor: deviceData.map((item) => item.color),
          borderColor: deviceData.map((item) => item.color),
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
            label: (context: any) => `${context.label}: ${context.parsed}%`,
          },
        },
      },
      cutout: "60%",
    }),
    [],
  )

  if (loading) {
    return <ChartSkeleton height="h-80" showLegend />
  }

  return (
    <Card className="border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Device Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          {deviceData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-gray-600">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(DeviceBreakdown)
