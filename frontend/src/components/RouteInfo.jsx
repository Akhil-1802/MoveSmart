import { Add } from '@mui/icons-material'
import { MapPin, Clock, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function RouteInfo({ stops,DriverID }) {
  const Navigate = useNavigate()
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Route Information</h2>
      {
        stops.length === 0 ?<button
        onClick={()=>(Navigate(`/addroutes/${DriverID}`))}
        type="button"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        <Add  className="mr-2" />
        Add Routes
      </button>:
      <ul className="space-y-4">
      {stops.map((stop, index) => (
        <li key={index} className="flex items-start">
          <MapPin className="mr-2 mt-1 text-blue-500" />
          <div>
            <p className="font-medium">{stop.name}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              <span>{stop.time} {stop.time < `12:00`?`AM` : `PM`}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
      }
      
    </div>
  )
}

