import { MapPin, Clock } from 'lucide-react'

export default function RouteInfo({ stops }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Route Information</h2>
      <ul className="space-y-4">
        {stops.map((stop, index) => (
          <li key={index} className="flex items-start">
            <MapPin className="mr-2 mt-1 text-blue-500" />
            <div>
              <p className="font-medium">{stop.name}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                <span>{stop.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

