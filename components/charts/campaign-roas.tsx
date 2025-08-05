"use client"

import { useState, useEffect, memo, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scatter } from "react-chartjs-2"
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import ChartSkeleton from "../skeletons/chart-skeleton"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const campaignData = [
  { spend: 1200, roas: 2.1, campaign: "Summer Sale" },
  { spend: 2400, roas: 3.2, campaign: "Black Friday" },
  { spend: 1800, roas: 2.8, campaign: "Holiday Special" },
  { spend: 3200, roas: 4.1, campaign: "New Year" },
  { spend: 900, roas: 1.9, campaign: "Spring Launch" },
  { spend: 2800, roas: 3.6, campaign: "Back to School" },
  { spend: 1500, roas: 2.5, campaign: "Valentine's Day" },
  { spend: 2200, roas: 3.1, campaign: "Mother's Day" },
]

function CampaignROAS() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2400)

    return () => clearTimeout(timer)
  }, [])

  const chartData = useMemo(
    () => ({
      datasets: [
        {
          label: "Campaign ROAS",
          data: campaignData.map((item) => ({
            x: item.spend,
            y: item.roas,
            campaign: item.campaign,
          })),
          backgroundColor: "#8b5cf6",
          borderColor: "#8b5cf6",
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBorderWidth: 2,
          pointBorderColor: "#ffffff",
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
            title: (context: any) => context[0].raw.campaign,
            label: (context: any) => [`Spend: $${context.parsed.x.toLocaleString()}`, `ROAS: ${context.parsed.y}x`],
          },
        },
      },
      scales: {
        x: {
          type: "linear" as const,
          position: "bottom" as const,
          title: {
            display: true,
            text: "Spend ($)",
            color: "#6b7280",
            font: {
              size: 12,
            },
          },
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
        y: {
          title: {
            display: true,
            text: "ROAS (x)",
            color: "#6b7280",
            font: {
              size: 12,
            },
          },
          grid: {
            color: "#f0f0f0",
            drawBorder: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
            callback: (value: any) => value + "x",
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
        <CardTitle className="text-lg font-semibold text-gray-900">Campaign ROAS vs Spend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <Scatter data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(CampaignROAS)
