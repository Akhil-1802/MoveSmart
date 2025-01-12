import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
    const Navigate = useNavigate()
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = async (e)=>{
      e.preventDefault();
    if(Email == '' || Password == ''){
        toast.error('Fill all fields',{
            autoClose:2000,
            position:"top-center"
        })
        return ;
    } 
    // Handle login logic here
    try {
        const response = await fetch(`http://localhost:3000/admin/login/${Email}/${Password}`,{
            method:"POST",
            credentials:"include"
        })
        if(response.ok){
            Navigate('/admin')
            toast.success("Admin Login",{
                autoClose:2000,
                position:"top-center"
            })
        }
        
    } catch (error) {
        toast.error('Login failed , try again!',{
            autoClose:2000,
            position:'top-center'
        })
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-teal-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-96 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8 tracking-wide">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Admin Name Field */}
          <div>
            <label htmlFor="adminName" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="adminName"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Admin Email"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ease-in-out duration-200"
            />
          </div>

          {/* Admin ID Field */}
          <div>
            <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="text"
              id="adminId"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition ease-in-out duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-teal-500 text-white rounded-xl font-semibold text-lg hover:bg-teal-600 transition ease-in-out duration-200 shadow-md transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Not registered?{' '}
            <span
              onClick={() => Navigate('/adminregister')}
              className="text-teal-500 cursor-pointer hover:text-teal-600"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
