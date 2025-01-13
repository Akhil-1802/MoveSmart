import { useState, useEffect } from "react";
import { Save, Info } from "lucide-react";
import { CircularProgress } from "@mui/material";

export default function BusInfoUpdate({
  initialSeats,
  initialStatus,
  driverID,
  setupdateData,
}) {
  const [availableSeats, setAvailableSeats] = useState(initialSeats);
  const [busStatus, setBusStatus] = useState(initialStatus);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Use Effect to reset to initial values when component mounts
  useEffect(() => {
    setAvailableSeats(initialSeats);
    setBusStatus(initialStatus);
  }, [initialSeats, initialStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/driver/updateDriverdata/${driverID}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seat: availableSeats, BusStatus: busStatus }),
        }
      );
      if (response.ok) {
        // Reset values to initial after successful update
        setAvailableSeats(initialSeats);
        setBusStatus(initialStatus);
        setupdateData(true);
      }
      setMessage("Bus information updated successfully!");
      setTimeout(() => {
        setMessage("");
        setupdateData(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setMessage("Failed to update bus information.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {loading && (
        <div className="inset-0 fixed backdrop-blur-sm z-20 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Update Bus Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="availableSeats"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="busStatus"
            className="block text-sm font-medium text-gray-700"
          >
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
  );
}
