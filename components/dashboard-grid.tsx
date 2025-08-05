"use client"

import { lazy, Suspense, useState } from "react"
import { BarChart3 } from "lucide-react"
import Shortcuts from "./shortcuts"
import MetricsCards from "./metrics-cards"
import NewestLearning from "./newest-learning"
import ChartSkeleton from "./skeletons/chart-skeleton"
import { Button } from "@/components/ui/button"
import Footer from "./footer"

// Lazy-loaded charts
const RevenueChart = lazy(() => import("./charts/revenue-chart"))
const ConversionFunnel = lazy(() => import("./charts/conversion-funnel"))
const ChannelPerformance = lazy(() => import("./charts/channel-performance"))
const AudienceSegments = lazy(() => import("./charts/audience-segments"))
const CampaignROAS = lazy(() => import("./charts/campaign-roas"))
const GeographicDistribution = lazy(() => import("./charts/geographic-distribution"))
const DeviceBreakdown = lazy(() => import("./charts/device-breakdown"))
const TimeSeriesAnalysis = lazy(() => import("./charts/time-series-analysis"))
const AttributionModel = lazy(() => import("./charts/attribution-model"))
const RealtimeMetrics = lazy(() => import("./charts/realtime-metrics"))

export default function DashboardGrid() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="w-full space-y-6 md:space-y-8">
      <Shortcuts />
      <MetricsCards />

    <h2 className="text-lg font-semibold text-gray-900 mb-4"> Marketing Analytics Dashboard</h2>
      {/* First 5 charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="xl:col-span-2">
          <Suspense fallback={<ChartSkeleton height="h-80" />}>
            <RevenueChart />
          </Suspense>
        </div>
        <div className="xl:col-span-1">
          <Suspense fallback={<ChartSkeleton height="h-80" />}>
            <ConversionFunnel />
          </Suspense>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Suspense fallback={<ChartSkeleton height="h-80" />}>
          <ChannelPerformance />
        </Suspense>
        <Suspense fallback={<ChartSkeleton height="h-80" />}>
          <AudienceSegments />
        </Suspense>
      </div>

      {/* Load More Button */}
      {!showMore && (
        <div className="flex justify-center">
          <Button onClick={() => setShowMore(true)} className="px-6 py-2">
            Load More Charts
          </Button>
        </div>
      )}

      {/* Remaining charts (5) */}
      {showMore && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <Suspense fallback={<ChartSkeleton height="h-80" />}>
              <CampaignROAS />
            </Suspense>
            <Suspense fallback={<ChartSkeleton height="h-80" />}>
              <GeographicDistribution />
            </Suspense>
            <Suspense fallback={<ChartSkeleton height="h-80" />}>
              <DeviceBreakdown />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Suspense fallback={<ChartSkeleton height="h-80" />}>
              <TimeSeriesAnalysis />
            </Suspense>
            <Suspense fallback={<ChartSkeleton height="h-80" />}>
              <AttributionModel />
            </Suspense>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Suspense fallback={<ChartSkeleton height="h-80" />}>
              <RealtimeMetrics />
            </Suspense>
            {/* <div className="flex items-center justify-center h-80 border border-gray-100 rounded-lg bg-gray-50/50">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">Additional Analytics</p>
                <p className="text-sm text-gray-400 mt-1">More charts coming soon</p>
              </div>
            </div> */}
          </div>
        </>
      )}

      <NewestLearning />
     <Footer/>
    </div>
  )
}
