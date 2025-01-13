import React, { useState } from 'react';
import { Button, Input } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

export default function AddRoutesPage() {
    const Navigate = useNavigate()
    const {DriverID} = useParams()
  const [routes, setRoutes] = useState([{ name: '', time: '' }]);

  const addRoute = () => {
    setRoutes([...routes, { name: '', time: '' }]);
  };

  const handleRouteChange = (index, field, value) => {
    const updatedRoutes = routes.map((route, i) => {
      if (i === index) {
        return { ...route, [field]: value };
      }
      return route;
    });
    setRoutes(updatedRoutes);
  };

  const handleSubmit = async() => {
    // Handle form submission here (e.g., send data to backend or log it)
    console.log("Routes submitted:", routes);
    const response = await fetch(`http://localhost:3000/driver/addRoutes/${DriverID}`,{
        method:"POST",
        credentials:'include',
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({routes})
    })
    if(response.ok){
        const data = await response.json()
        Navigate(`/driver/${data.DriverData.BusNumber}`)
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="w-full bg-blue-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">Add Routes</h1>
      </header>

      {/* Form container */}
      <div className="flex flex-1 justify-center items-center p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          {/* Input Fields */}
          {routes.map((route, index) => (
            <div key={index} className="mb-4 flex justify-evenly">
              <div className="mb-4 ">
                <label className="block text-sm font-medium text-gray-700">Route Name</label>
                <Input
                  type="text"
                  value={route.name}
                  onChange={(e) => handleRouteChange(index, 'name', e.target.value)}
                  placeholder="Enter route name"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Route Time</label>
                <Input
                  type="time"
                  value={route.time}
                  onChange={(e) => handleRouteChange(index, 'time', e.target.value)}
                  placeholder="Enter route time"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6 ">
            <Button
            sx={{background:'red'}}
              onClick={addRoute}
              className=" text-white font-bold py-2 px-4 rounded mr-4"
            >
              Add Route
            </Button>
            <Button
            sx={{background:'#5dd95f'}}
              onClick={handleSubmit}
              className=" text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
