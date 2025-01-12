import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      toast.error('Fill all fields', {
        autoClose: 2000,
        position: 'top-center',
      });
      return;
    }

    // Handle registration logic here
    const response = await fetch('http://localhost:3000/admin/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({Name: name,Email: email,Password: password }),
    });

    if (response.ok) {
      toast.success('Registered', {
        autoClose: 2000,
        position: 'top-center',
      });
      navigate('/adminlogin'); // Navigate to login page after successful registration
    } else {
      toast.error('Registration failed, please try again', {
        autoClose: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-teal-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[35%] transform transition-all hover:scale-105">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8 tracking-wide">
          Admin Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ease-in-out duration-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ease-in-out duration-200"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ease-in-out duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-teal-500 text-white rounded-xl font-semibold text-lg hover:bg-teal-600 transition ease-in-out duration-200 shadow-md transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/adminlogin')}
              className="text-teal-500 cursor-pointer hover:text-teal-600"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
