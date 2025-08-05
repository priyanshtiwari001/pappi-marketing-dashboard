"use client"

import { useState, useEffect, memo, useMemo, useCallback } from "react"
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
} from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function RealtimeMetrics() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([
    { time: "10:00", visitors: 45 },
    { time: "10:05", visitors: 52 },
    { time: "10:10", visitors: 48 },
    { time: "10:15", visitors: 61 },
    { time: "10:20", visitors: 55 },
    { time: "10:25", visitors: 67 },
  ])

  const updateData = useCallback(() => {
    setData((prevData) => {
      const newData = [...prevData.slice(1)]
      const lastTime = prevData[prevData.length - 1].time
      const [hours, minutes] = lastTime.split(":").map(Number)
      const newMinutes = (minutes + 5) % 60
      const newHours = minutes + 5 >= 60 ? hours + 1 : hours
      const newTime = `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}`

      newData.push({
        time: newTime,
        visitors: Math.floor(Math.random() * 40) + 40,
      })

      return newData
    })
  }, [])

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false)
    }, 3400)

    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(updateData, 3000)
      return () => clearInterval(interval)
    }
  }, [loading, updateData])

  const chartData = useMemo(
    () => ({
      labels: data.map((item) => item.time),
      datasets: [
        {
          label: "Visitors",
          data: data.map((item) => item.visitors),
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }),
    [data],
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
            label: (context: any) => `Visitors: ${context.parsed.y}`,
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
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index" as const,
      },
      animation: {
        duration: 750,
        easing: "easeInOutQuart" as const,
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
        <CardTitle className="text-lg font-semibold text-gray-900">Real-time Visitors</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(RealtimeMetrics)
