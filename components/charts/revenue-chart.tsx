"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const rawData = [
  { month: "Jan", revenue: 45000, spend: 18000 },
  { month: "Feb", revenue: 52000, spend: 19500 },
  { month: "Mar", revenue: 48000, spend: 17800 },
  { month: "Apr", revenue: 61000, spend: 21200 },
  { month: "May", revenue: 55000, spend: 20100 },
  { month: "Jun", revenue: 67000, spend: 22800 },
  { month: "Jul", revenue: 72000, spend: 24500 },
  { month: "Aug", revenue: 69000, spend: 23200 },
  { month: "Sep", revenue: 78000, spend: 26100 },
  { month: "Oct", revenue: 85000, spend: 28500 },
  { month: "Nov", revenue: 92000, spend: 30200 },
  { month: "Dec", revenue: 98000, spend: 32100 },
]

function RevenueChart() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      labels: rawData.map((item) => item.month),
      datasets: [
        {
          label: "Revenue",
          data: rawData.map((item) => item.revenue),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
        },
        {
          label: "Spend",
          data: rawData.map((item) => item.spend),
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#ef4444",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
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
          displayColors: true,
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
      interaction: {
        intersect: false,
        mode: "index" as const,
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
        <CardTitle className="text-lg font-semibold text-gray-900">Revenue vs Spend Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(RevenueChart)
