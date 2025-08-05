import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MetricCardSkeleton() {
  return (
    <Card className="hover:shadow-md transition-shadow  w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24 mb-2" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}
