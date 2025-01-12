
import { useState } from 'react'
import { Save, AlertTriangle, Info } from 'lucide-react'

export default function BusInfoUpdate({ initialSeats, initialStatus }) {
  const [availableSeats, setAvailableSeats] = useState(initialSeats)
  const [busStatus, setBusStatus] = useState(initialStatus)
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send an update to your backend
    setMessage('Bus information updated successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Update Bus Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
            Available Seats
          </label>
          <input
            type="number"
            id="availableSeats"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="busStatus" className="block text-sm font-medium text-gray-700">
            Bus Status
          </label>
          <select
            id="busStatus"
            value={busStatus}
            onChange={(e) => setBusStatus(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Save className="mr-2" />
          Update Information
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded flex items-center">
          <Info className="mr-2" />
          {message}
        </div>
      )}
    </div>
  )
}

