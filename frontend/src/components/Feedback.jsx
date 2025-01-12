import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Feedback({setfeedback}) {
  const [rideExperience, setRideExperience] = useState("");
  const [behaviour, setBehaviour] = useState("");
  const [helpful, setHelpful] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [BusNumber , setBusNumber] = useState("")

  const handleRadioChange = (e) => {
    setRideExperience(e.target.value);
  };
  //FormSubmit
  const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:3000/user/feedback',{
            method: 'POST',
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({BusNumber,Experience : rideExperience , Helpful : helpful , Suggestions :suggestions, DriverBehaviour : behaviour})
    
          })
        if(response.ok){
            toast.success("Feedback Submitted",{
                position: "top-center",
            autoClose: 2000
            })
            setfeedback(false)
        }
  }

  return (
    <div className="w-[35vw] h-[72vh] bg-slate-100 rounded-sm">
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Send Us Your Feedback!</h1>
        <span className="cursor-pointer" onClick={()=>(setfeedback(false))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            color="white"
            fill="white"
          >
            <path
              d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col h-[84%] justify-evenly  ">
      <TextField
          sx={{
            width: "90%",
            marginLeft: "20px",
          }}
          value={BusNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          type="text"
          id="outlined-basic"
          label="Bus Number"
          variant="outlined"
        />
        {/* Ride Experience Section */}
        <div className="flex gap-2 flex-col">
          <h1 className="px-6 text-xl">How was your Ride?</h1>
          <div className="flex justify-evenly">
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="rideExperience" // Unique name for this group
                value="Bad"
                checked={rideExperience === "Bad"}
                onChange={handleRadioChange}
              />
              Bad
            </label>
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="rideExperience"
                value="Average"
                checked={rideExperience === "Average"}
                onChange={handleRadioChange}
              />
              Average
            </label>
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="rideExperience"
                value="Good"
                checked={rideExperience === "Good"}
                onChange={handleRadioChange}
              />
              Good
            </label>
          </div>
        </div>

        {/* Driver Behaviour Section */}
        <div className="flex gap-2 flex-col">
          <h1 className="px-6 text-xl">How was Driver behaviour?</h1>
          <div className="flex justify-evenly">
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="driverBehaviour" // Unique name for this group
                value="Bad"
                checked={behaviour === "Bad"}
                onChange={(e) => setBehaviour(e.target.value)}
              />
              Bad
            </label>
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="driverBehaviour"
                value="Average"
                checked={behaviour === "Average"}
                onChange={(e) => setBehaviour(e.target.value)}
              />
              Average
            </label>
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="driverBehaviour"
                value="Good"
                checked={behaviour === "Good"}
                onChange={(e) => setBehaviour(e.target.value)}
              />
              Good
            </label>
          </div>
        </div>

        {/* Website Helpfulness Section */}
        <div className="flex gap-2 flex-col">
          <h1 className="px-6 text-xl ">Do you find our website helpful?</h1>
          <div className="flex justify-evenly">
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="websiteHelpful" // Unique name for this group
                value="Yes"
                checked={helpful === "Yes"}
                onChange={(e) => setHelpful(e.target.value)}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 justify-center text-[17px]">
              <input
                type="radio"
                name="websiteHelpful"
                value="No"
                checked={helpful === "No"}
                onChange={(e) => setHelpful(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        {/* Suggestions Section */}

        <TextField
          sx={{
            width: "90%",
            marginLeft: "20px",
          }}
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          type="text"
          id="outlined-basic"
          label="Any Suggestions( i.e comma seperated)"
          variant="outlined"
        />
        
        

        <div className="text-center w-full">
          <Button
          type="submit"
            sx={{
              padding: "10px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
