import Header from '../components/Header'
// import LocationSharing from './components/LocationSharing'
import ServiceToggle from '../components/ServiceToggle'
import BusInfoUpdate from '../components/BusInfoUpdate'
import RouteInfo from '../components/RouteInfo'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const {busno} = useParams()
  const [ driver , setdriver] = useState({})
  const [updateData , setupdateData] = useState(false)
  // Hardcoded driver and bus data (Updated for Indian bus service)
  const driverData = {
    name: "Akash Yadav",
    id: "DRV123",
    busNumber: "MH12AB1234", // Typical Indian bus registration number
    route: "Pune - Mumbai Express",
    nextStop: "Lonavala",
    estimatedArrival: "10:30 AM",
    shiftStart: "5:30 AM",
    shiftEnd: "2:30 PM",
    totalTrips: 6,
    totalPassengers: 195,
    fuelLevel: "60%",
    mileage: 150.0, // In km
    availableSeats: 15,
    busStatus: "On Time"
  }

  // Hardcoded statistics (Updated for Indian bus service)
  const statistics = {
    onTimePerformance: "88%", // Typically lower for Indian routes due to traffic conditions
    averageSpeed: "40 km/h",
    fuelEfficiency: "4.5 km/l",
    customerSatisfaction: "4.2/5", // Reflecting average feedback
    safetyScore: "90/100" // Reflecting common safety standards
  }

  const routeStops = [
    { name: "Pune Bus Stand", time: "06:00 AM" },
    { name: "Khadki", time: "06:30 AM" },
    { name: "Lonavala", time: "08:00 AM" },
    { name: "Khandala", time: "08:30 AM" },
    { name: "Kalyan", time: "09:30 AM" },
    { name: "Thane", time: "10:00 AM" },
    { name: "Mumbai Dadar", time: "10:30 AM" }
  ]
  const getDriverData = async( )=>{
    try {
      const response = await fetch(`http://localhost:3000/driver/getdriverdata/${busno}`)
      if(response.ok){
        const data = await response.json()
        setdriver(data.Driver)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getDriverData()
  },[updateData])

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Driver Information</h2>
              <p><strong>Name:</strong> {driver.Name}</p>
              <p><strong>Driver ID:</strong> {driver.DriverID}</p>
              <p><strong>Bus Number:</strong> {driver.BusNumber}</p>
              <p><strong>Route:</strong> {driver.from} - {driver.to}</p>
              <p><strong>Shift:</strong> {driver.shiftstart} {driver.shiftstart < `12:00` ? `AM`:`PM`} - {driver.shiftend} {driver.shiftend<`12:00`?`AM`:`PM`}</p>
              <p><strong>Status:</strong> {driver.BusStatus}</p>
            </div>
            <ServiceToggle />
            <BusInfoUpdate initialSeats={driver.seat} initialStatus={driver.BusStatus} driverID={driver.DriverID} setupdateData={setupdateData}/>
            <RouteInfo stops={driver.Routes || []} DriverID={driver.DriverID}/>
          </div>
          <div>
            {/* <LocationSharing /> */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Today's Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Total Trips</p>
                  <p className="text-2xl font-bold">{driverData.totalTrips}</p>
                </div>
                <div>
                  <p className="font-medium">Total Passengers</p>
                  <p className="text-2xl font-bold">{driverData.totalPassengers}</p>
                </div>
                <div>
                  <p className="font-medium">Fuel Level</p>
                  <p className="text-2xl font-bold">{driverData.fuelLevel}</p>
                </div>
                <div>
                  <p className="font-medium">Mileage</p>
                  <p className="text-2xl font-bold">{driverData.mileage} km</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">On-Time Performance</p>
                  <p className="text-2xl font-bold">{statistics.onTimePerformance}</p>
                </div>
                <div>
                  <p className="font-medium">Average Speed</p>
                  <p className="text-2xl font-bold">{statistics.averageSpeed}</p>
                </div>
                <div>
                  <p className="font-medium">Fuel Efficiency</p>
                  <p className="text-2xl font-bold">{statistics.fuelEfficiency}</p>
                </div>
                <div>
                  <p className="font-medium">Customer Satisfaction</p>
                  <p className="text-2xl font-bold">{statistics.customerSatisfaction}</p>
                </div>
                <div>
                  <p className="font-medium">Safety Score</p>
                  <p className="text-2xl font-bold">{statistics.safetyScore}</p>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Announcements</h2>
              <ul className="list-disc pl-5">
                <li>Please ensure that all passengers wear masks at all times.</li>
                <li>Road conditions may be challenging in Lonavala due to rain, drive cautiously.</li>
                <li>New safety protocols for handling passenger complaints will be rolled out soon.</li>
                <li>Remember to update your shift logs regularly for accurate data tracking.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
