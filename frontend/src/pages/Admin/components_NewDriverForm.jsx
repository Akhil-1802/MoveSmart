import React, { useState } from 'react';
import { User, Bus, Mail, Phone, Key, Check, AlertCircle, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewDriverForm = ({ onAddDriver, onClose }) => {
  const { Email }= useParams()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    experience: '',
    busNumber: ''
  });

  const [showCredentials, setShowCredentials] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const password = Math.random().toString(36).slice(-8);
    
    const credentials = {
      username: formData.email,
      password: password,
      busNumber: formData.busNumber
    };

    setGeneratedCredentials(credentials);
    setShowCredentials(true);

    const newDriver = {
      ...formData,
      ...credentials
    };
    const response = await fetch(`http://localhost:3000/admin/Driver/${Email}`,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({...formData})
      
    })
    if(response.ok){
      onAddDriver(newDriver);
    }
    else{
      toast.error('Bus Already Exists',{
        autoClose:2000,
        position:'top-center'
      })
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4" />
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="h-4 w-4" />
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail className="h-4 w-4" />
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Phone className="h-4 w-4" />
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="licenseNumber" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Key className="h-4 w-4" />
            License Number
          </label>
          <input
            id="licenseNumber"
            name="licenseNumber"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="experience" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <User className="h-4 w-4" />
            Years of Experience
          </label>
          <input
            id="experience"
            name="experience"
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="busNumber" className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Bus className="h-4 w-4" />
            Bus Number
          </label>
          <input
            id="busNumber"
            name="busNumber"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={formData.busNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <X className="h-4 w-4 mr-2 inline" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Check className="h-4 w-4 mr-2 inline" />
          Create Driver Account
        </button>
      </div>

      {showCredentials && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-md border border-yellow-200">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
            <h3 className="text-sm font-medium text-yellow-800">Driver Login Credentials</h3>
          </div>
          <div className="mt-2 text-sm text-yellow-700">
            <p><span className="font-medium">Username:</span> {generatedCredentials.username}</p>
            <p><span className="font-medium">Password:</span> {generatedCredentials.password}</p>
            <p><span className="font-medium">Bus Number:</span> {generatedCredentials.busNumber}</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default NewDriverForm;

