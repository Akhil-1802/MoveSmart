import { useState, useEffect } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';
import io from 'socket.io-client';

export default function ServiceToggle({driver}) {
  const [isOnService, setIsOnService] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [socket, setSocket] = useState(null);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
  
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

  
    return () => {
      newSocket.close();
    };
  }, []);

  const startSharing = () => {
    if (navigator.geolocation && socket) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude : lat, longitude : lng } = position.coords;
          socket.emit('busLocation', {
            driver,
            BusNumber: driver.BusNumber, // Replace with unique bus ID
            lat,
            lng,
          });
        },
        (error) => {
          alert('Error getting location: ' + error.message);
        },
        {
          enableHighAccuracy: true,
        }
      );
      setWatchId(id);
      setIsSharing(true);
    } else {
      alert('Geolocation is not supported by your browser or socket is not connected.');
    }
  };

  const stopSharing = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsSharing(false);
    }
  };

  const toggleService = () => {
    if (isOnService) {
      stopSharing(); 
    } else {
      startSharing(); 
    }
    setIsOnService(!isOnService);

    
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Service Status</h2>
      <div className="flex items-center justify-between">
        <span className="text-lg">{isOnService ? 'On Service' : 'Off Service'}</span>
        <button
          onClick={toggleService}
          className={`flex items-center justify-center w-16 h-8 rounded-full focus:outline-none transition-colors duration-200 ease-in-out ${
            isOnService ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          {isOnService ? (
            <ToggleRight className="text-white" />
          ) : (
            <ToggleLeft className="text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}
