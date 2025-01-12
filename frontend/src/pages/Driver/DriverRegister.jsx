import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function DriverRegister() {
  const Navigate = useNavigate();
  const [Name ,setName] = useState('')
  const [BusName , setBusName] = useState('')
  const [BusNumber, setBusNumber] = useState('')
  const [from , setfrom] = useState('')
  const [to , setto] = useState('')
  const [arrival , setarrival] = useState('')
  const [departure , setdeparture] = useState('')
  const [seat, setseat] = useState("");
  const [PhoneNumber , setPhoneNumber] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Name=="" || BusName=="" || BusNumber=="" || PhoneNumber=="" || from=="" || to=="" || departure=="" || arrival=="" || seat=="") {
      alert("Please fill out both fields.");
      return;
    }
    const response = await fetch('http://localhost:3000/driver/register',{
        method: 'POST',
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({Name , BusName , BusNumber , PhoneNumber , from , to , departure , arrival, seat})

      })
    if (response.ok) {
        console.log(response)
      Navigate("/driver");
      toast.success("Driver Registered", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    // Add further login logic here
  };
  return (
    <div className="flex bg-slate-100">
      <div className="my-auto min-h-screen w-[40%] mx-auto mt-8">
        <h1 className="text-center font-bold text-3xl font-sans">
          Register Your Bus
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-[60%] mx-auto flex-col gap-4 my-8"
          action=""
        >
          <div className="flex gap-4">
            <TextField
              value={Name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="outlined-basic"
              label="Your Name"
              variant="outlined"
            />
            <TextField
              value={BusName}
              onChange={(e) => setBusName(e.target.value)}
              type="text"
              id="outlined-basic"
              label="Bus Name"
              variant="outlined"
            />
          </div>
          <TextField
            value={BusNumber}
            onChange={(e) => setBusNumber(e.target.value)}
            type="text"
            id="outlined-basic"
            label="Bus Number"
            variant="outlined"
          />
          <TextField
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
          />

          <div className="flex gap-8">
            <TextField
              value={from}
              onChange={(e) => setfrom(e.target.value)}
              type="text"
              id="outlined-basic"
              label="From"
              variant="outlined"
            />
            <TextField
              value={to}
              onChange={(e) => setto(e.target.value)}
              type="text"
              id="outlined-basic"
              label="To"
              variant="outlined"
            />
          </div>
          <div className="flex justify-between">
          <div className="flex flex-col items-center ">
                <h3>Departure</h3>
            <TextField
            sx={
                {
                    width:"130px"
                }
            }
              value={departure}
              onChange={(e) => setdeparture(e.target.value)}
              type="time"
              id="outlined-basic"
              label=""
              variant="outlined"
            />
            </div>
            <div className="flex flex-col items-center">
                <h3>Arrival</h3>
            <TextField
            sx={
                {
                    width:"130px"
                }
            }
              value={arrival}
              onChange={(e) => setarrival(e.target.value)}
              type="time"
              id="outlined-basic"
              label=""
              variant="outlined"
            />
            </div>
          </div>
          <TextField
            value={seat}
            onChange={(e) => setseat(e.target.value)}
            type="number"
            id="outlined-basic"
            label="No. of Seats"
            variant="outlined"
          />
          <Button
            type="submit"
            sx={{ paddingTop: "10px", marginTop: "20px" }}
            variant="contained"
          >
            Register
          </Button>
          <div className="flex items-center justify-start">
            <p className="text-center">Already Registered?</p>
            <Link
              className="text-sm text-blue-500 underline"
              to={"/driverlogin"}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className="min-h-screen w-[60%] ">
        <img
          className="cover h-[98%] mt-2 w-[98%] ml-2 rounded-lg"
          src="/driverlogin.webp"
          alt=""
        />
      </div>
    </div>
  );
}

export default DriverRegister;
