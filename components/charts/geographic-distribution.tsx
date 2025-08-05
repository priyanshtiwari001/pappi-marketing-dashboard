"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const geoData = [
  { country: "United States", revenue: 45200, users: 12400 },
  { country: "Canada", revenue: 18900, users: 5200 },
  { country: "United Kingdom", revenue: 15600, users: 4100 },
  { country: "Germany", revenue: 12800, users: 3500 },
  { country: "France", revenue: 9200, users: 2800 },
  { country: "Australia", revenue: 7800, users: 2100 },
]

function GeographicDistribution() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2600)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      labels: geoData.map((item) => item.country),
      datasets: [
        {
          label: "Revenue ($)",
          data: geoData.map((item) => item.revenue),
          backgroundColor: "#06b6d4",
          borderColor: "#06b6d4",
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
            label: (context: any) => {
              const dataIndex = context.dataIndex
              const users = geoData[dataIndex].users
              return [`Revenue: $${context.parsed.y.toLocaleString()}`, `Users: ${users.toLocaleString()}`]
            },
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
        <CardTitle className="text-lg font-semibold text-gray-900">Geographic Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(GeographicDistribution)
