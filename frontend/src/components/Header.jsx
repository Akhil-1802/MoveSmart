import { BusFront, Bell } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BusFront className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Move Smart</h1>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-4 mr-4 items-center justify-center">
            <li><a href="#" className="text-black  no-underline hover:text-blue-200">Dashboard</a></li>
            <li><a href="#" className="text-black  no-underline hover:text-blue-200">Schedule</a></li>
            <li><a href="#" className="text-black  no-underline hover:text-blue-200">Reports</a></li>
            <li><a href="#" className="text-black  no-underline hover:text-blue-200">Profile</a></li>
          </ul>
          <button className="p-2 hover:bg-blue-700 rounded-full">
            <Bell className="h-6 w-6" />
          </button>
        </nav>
      </div>
    </header>
  )
}

