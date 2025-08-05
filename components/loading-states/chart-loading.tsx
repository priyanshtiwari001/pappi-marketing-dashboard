export default function ChartLoading() {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-sm text-gray-500">Loading chart data...</p>
      </div>
    </div>
  )
}
