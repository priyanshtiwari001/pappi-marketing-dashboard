"use client"

import { Bell, Search, User} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PaapiLogo from "./paapi-logo"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="flex items-center space-x-3">
            <PaapiLogo/>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Product
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Our Story
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search..." className="pl-10 w-64 border-gray-200" />
          </div>

          {/* Mobile search button */}
          <Button variant="ghost" size="icon" className="md:hidden text-gray-600 hover:text-gray-900">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>

          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-3 md:px-6 text-sm">
            <span className="hidden sm:inline">Book A Demo</span>
            <span className="sm:hidden">Demo</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
