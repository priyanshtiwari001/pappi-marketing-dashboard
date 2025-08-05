
import Header from "@/components/header"
import DashboardGrid from '@/components/dashboard-grid'

export default function Dashboard() {
  return (
      <div className="flex min-h-screen bg-gray-50/30">
        <div className="flex-1 flex flex-col min-w-0">
         <Header  />
          <main className="flex-1 bg-white p-4 md:p-6 overflow-auto">
            <div className="max-w-full mx-auto">
                <DashboardGrid />
            </div>
          </main>
        </div>
      </div>
  )
}
