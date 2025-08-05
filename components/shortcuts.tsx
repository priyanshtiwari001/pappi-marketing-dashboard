import { Card } from "@/components/ui/card"
import {shortcuts} from '@/lib/data'


export default function Shortcuts() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Shortcuts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {shortcuts.map((shortcut) => (
          <Card
            key={shortcut.title}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 w-full"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3  rounded-lg">
                <shortcut.icon className="h-20 w-20 text-gray-900" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{shortcut.title}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
