import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ChartSkeletonProps {
  height?: string
  showLegend?: boolean
}

export default function ChartSkeleton({ height = "h-72", showLegend = false }: ChartSkeletonProps) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <div className={`${height} bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden`}>
          {/* Chart area skeleton */}
          <div className="absolute inset-4">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-3 w-6" />
              ))}
            </div>

            {/* X-axis */}
            <div className="absolute bottom-0 left-8 right-0 h-8 flex justify-between items-end">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-3 w-8" />
              ))}
            </div>

            {/* Chart content area */}
            <div className="absolute left-8 right-0 top-0 bottom-8 flex items-end justify-between space-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center space-y-1">
                  <Skeleton className="w-full bg-blue-200" style={{ height: `${Math.random() * 60 + 20}%` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Loading indicator */}
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-sm">Loading chart...</span>
            </div>
          </div>
        </div>

        {showLegend && (
          <div className="flex justify-center space-x-4 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="w-3 h-3 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
