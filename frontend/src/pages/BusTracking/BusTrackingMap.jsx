import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search } from "lucide-react";

// Utility functions
const calculateETA = (distance, speed) => {
  if (speed <= 0) return Infinity;
  return distance / speed;
 
};

const formatTime = (seconds) => {
  if (!isFinite(seconds)) return "N/A";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
};

const formatSpeed = (speed) => {
  return `${speed.toFixed(1)} km/h`;
};

// Custom components
const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-900">{children}</h2>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const SearchInput = ({ onSearch }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search buses..."
      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={(e) =>( onSearch(e.target.value))}
    />
    <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
  </div>
);

// Main component
const BusTrackingMap = () => {
  const [busLocations, setBusLocations] = useState({});
  const [busPaths, setBusPaths] = useState({});
  const [selectedBus, setSelectedBus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mapCenter, setMapCenter] = useState([28.6836, 77.3729]); 
  const [distanceToUser, setDistanceToUser] = useState(0);
  const socket = useRef(null);
  const mapRef = useRef(null);
  const previousLocations = useRef({});
  const markersRef = useRef({});

  const [notificationSent, setNotificationSent] = useState(false);
 // ...existing code...
 useEffect(() => {
  if (userLocation && Object.keys(busLocations).length > 0) {
    // Calculate distances to all buses and find the closest one
    const distances = Object.values(busLocations).map(bus => 
      calculateDistance(
        bus.lat,
        bus.lng,
        userLocation.lat,
        userLocation.lng
      )
    );
    const closestDistance = Math.min(...distances);
    setDistanceToUser(closestDistance);

    // Send notification when distance is less than 2000m
    if (closestDistance < 2000 && !notificationSent) {
      sendNotification();
      setNotificationSent(true);
    } else if (closestDistance >= 2000) {
      setNotificationSent(false); // Reset notification state when distance increases
    }
  }
}, [userLocation, busLocations, notificationSent]);
// ...existing code...

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("connect", () => {
      console.log("Socket.IO Connected");
      setIsLoading(false);
    });

    socket.current.on("locationUpdate", (data) => {
      const { BusNumber,lat: latitude, lng:longitude, passengers, nextStop,driver } = data;
      updateBusInfo(BusNumber, latitude, longitude, passengers, nextStop,driver);
    });

    socket.current.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      alert(
        "Unable to connect to the bus tracking server. Please try again later."
      );
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter([location.lat, location.lng]); 
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("Socket.IO Disconnected");
      }
    };
  }, []);

  const updateBusInfo = (busId, lat, lng, passengers, nextStop,driver) => {
    const currentTime = Date.now();
    const previousLocation = previousLocations.current[busId];

    let speed = 0;
    if (previousLocation) {
      const distance = calculateDistance(
        previousLocation.lat,
        previousLocation.lng,
        lat,
        lng
      );
      const timeDiff = (currentTime - previousLocation.timestamp) / 1000;
      speed = (distance / timeDiff) * 3.6;
    }

    previousLocations.current[busId] = { lat, lng, timestamp: currentTime };

    setBusLocations((prevLocations) => {
      const newLocation = {
        lat,
        lng,
        speed,
        passengers: driver.seat || 0,
        nextStop: nextStop || "Unknown",
        from : driver.from,
        to : driver.to
      };
      return { ...prevLocations, [busId]: newLocation };
    });

    setBusPaths((prevPaths) => {
      const newPath = prevPaths[busId]
        ? [...prevPaths[busId], [lat, lng]]
        : [[lat, lng]];
      return { ...prevPaths, [busId]: newPath };
    });
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // console.log("Distance:", R * c);
    const distance = R * c; // in metres
    return distance;
  };

  // Send email notification when within 2 km of the bus
  const sendNotification = async () => {
    try {
      console.log("Sending email notification...");
      const response = await fetch("http://localhost:3000/sendConfirmationEmail/alert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Email sent to user");
      }
    } catch (error) {
      console.error("Error sending email notification:", error);
    }
  };

  const BusMarkers = ({ busLocations, busPaths }) => {
    const map = useMap();
    const busIcon = L.icon({
      iconUrl:
        "https://cdn.iconscout.com/icon/free/png-512/free-bus-icon-download-in-svg-png-gif-file-formats--back-city-basic-icons-pack-industry-449853.png?f=webp&w=256",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    useEffect(() => {
      Object.entries(busLocations).forEach(([busId, { lat, lng }]) => {
        if (markersRef.current[busId]) {
          markersRef.current[busId].setLatLng([lat, lng]);
        } else {
          const marker = L.marker([lat, lng], { icon: busIcon }).addTo(map);
          marker.bindPopup(
            `<strong>Bus ${busId}</strong><br />Lat: ${lat.toFixed(
              4
            )}<br />Long: ${lng.toFixed(4)}`
          );
          marker.on("click", () => setSelectedBus(busId));
          markersRef.current[busId] = marker;
        }
      });
    }, [busLocations, map, busIcon]);

    return (
      <>
        {Object.entries(busPaths).map(([busId, path]) => (
          <Polyline key={busId} positions={path} color="blue" />
        ))}
      </>
    );
  };

  const filteredBuses = Object.entries(busLocations).filter(([busId]) =>
    busId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("THis is the user Distance>>",distanceToUser)
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Real-Time Bus Tracker
          </h1>
          <SearchInput onSearch={setSearchTerm} />
        </div>
      </header>

      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto flex space-x-6">
          {isLoading ? (
            <div className="w-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">
                  Connecting to the bus tracking system...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-2/3 h-[calc(100vh-8rem)] rounded-lg overflow-hidden shadow-lg">
                <MapContainer
                  center={mapCenter} // Dynamically update map center
                  zoom={13}
                  className="w-full h-full"
                  ref={mapRef}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <BusMarkers
                    busLocations={Object.fromEntries(filteredBuses)}
                    busPaths={busPaths}
                  />
                  {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>
                        <strong>Your Location</strong>
                        <br />
                        Lat: {userLocation.lat.toFixed(4)}
                        <br />
                        Long: {userLocation.lng.toFixed(4)}
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>

              <div className="w-1/3 space-y-6 ">
                <Card>
                  <CardHeader>
                    <CardTitle>Bus Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedBus ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                          Bus {selectedBus}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Speed</p>
                            <p className="font-medium">
                              {formatSpeed(busLocations[selectedBus].speed)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Passengers</p>
                            <p className="font-medium">
                              {busLocations[selectedBus].passengers}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Next Stop</p>
                            <p className="font-medium">
                              {busLocations[selectedBus].nextStop}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Route</p>
                            <p className="font-medium">
                              {busLocations[selectedBus].from} - {busLocations[selectedBus].to}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">ETA</p>
                            <p className="font-medium">
                              {formatTime(
                                calculateETA(
                                  1000,
                                  busLocations[selectedBus].speed
                                )
                              )}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            busLocations[selectedBus].speed > 0
                              ? "success"
                              : "warning"
                          }
                        >
                          {busLocations[selectedBus].speed > 0
                            ? "Moving"
                            : "Stopped"}
                        </Badge>
                        <Button
                          onClick={() => setSelectedBus(null)}
                          className="w-full"
                        >
                          Clear Selection
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Select a bus on the map to view details
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>All Buses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {filteredBuses.map(([busId, bus]) => (
                        <li key={busId}>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedBus(busId)}
                            className="w-full justify-between"
                          >
                            <span>Bus {busId}</span>
                            <Badge variant="secondary">
                              {bus.passengers} passengers
                            </Badge>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default BusTrackingMap;