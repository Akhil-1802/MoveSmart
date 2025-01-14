import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import NewDriverForm from './components_NewDriverForm';
import DriverList from './components_DriverList';
import { useParams } from 'react-router-dom';

const AdminPortal = () => {
  const { Email } = useParams()
  const [drivers, setDrivers] = useState([]);
  const [showNewDriverForm, setShowNewDriverForm] = useState(false);
  const getDrivers = async ()=>{
    try {
      const response = await fetch(`http://localhost:3000/admin/getdrivers/${Email}`)
      if(response.ok){
        const data = await response.json()
        setDrivers(data.Drivers)
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getDrivers()
  },[])
  const handleAddDriver = (newDriver) => {
    setDrivers([...drivers, newDriver]);
    setShowNewDriverForm(false);
    getDrivers()
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Drivers</h1>
          <button
            onClick={() => setShowNewDriverForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Driver
          </button>
        </div>
        {showNewDriverForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Add New Bus Driver</h2>
              <NewDriverForm onAddDriver={handleAddDriver} onClose={() => setShowNewDriverForm(false)} />
            </div>
          </div>
        )}
        <DriverList drivers={drivers} />
      </div>
    </div>
  );
};

export default AdminPortal;

