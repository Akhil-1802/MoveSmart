import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function DriverLogin() {
    const Navigate = useNavigate()
  const [busno, setBusno] = useState("");
  const [Password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!busno || !Password) {
      alert("Please fill out both fields.");
      return;
    }
    const response = await fetch (`http://localhost:3000/driver/login/${busno}/${Password}`,{
      method:"POST",
      credentials:"include"
    })
    if(response.ok){
        const data = await response.json()
        Navigate(`/driver/${busno}`)
        toast.success(' Driver Login ',{
          position : 'top-center',
          autoClose:2000
        })
    }
    // Add further login logic here
  };
  return (
    <div className="flex bg-slate-100">
      <div className="min-h-screen w-[60%] ">
        <img
          className="cover h-[98%] mt-2 w-[98%] ml-2 rounded-lg"
          src="/driverlogin.webp"
          alt=""
        />
      </div>
      <div className="my-auto  h-96 w-[40%] mx-auto">
        <h1 className="text-center font-bold text-3xl font-sans">
          Welcome To Move Smart
        </h1>
        <p className="text-center my-4">Login Before start driving</p>
        
        <form onSubmit={handleSubmit} className="flex w-[60%] mx-auto flex-col gap-4 my-10" action="">
          <TextField
            value={busno}
            onChange={(e) => setBusno(e.target.value)}
            type="text"
            id="outlined-basic"
            label="Bus Number"
            variant="outlined"
          />
          <TextField
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button
            type="submit"
            sx={{ paddingTop: "10px", marginTop: "20px" }}
            variant="contained"
          >
            Login
          </Button>
        <div className="flex items-center justify-start">
        <p className="text-center my-4">Not Registered?</p>
        <Link className="text-sm text-blue-500 underline" to={'/driverRegister'}>Register here</Link>
        </div>
        </form>
      </div>
    </div>
  );
}

export default DriverLogin;
