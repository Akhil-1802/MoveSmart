import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

function SOS({setsos}) {
  
const [issue , setIssue]= useState('')
  const [Name , setName] = useState('')
  const [ BusNumber , setBusNumber] = useState('')
  //FormSubmit
  const handleSubmit = async(e) =>{
        e.preventDefault()
        
        if(response.ok){
            toast.success("Feedback Submitted",{
                position: "top-center",
            autoClose: 2000
            })
            setfeedback(false)
        }
  }

  return (
    <div className="w-[30vw] h-[58vh] bg-slate-100 rounded-sm">
      <div className="bg-red-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-semibold">Emergency!</h1>
        <span className="cursor-pointer" onClick={()=>(setsos(false))}>
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

      <form onSubmit={handleSubmit} className="flex flex-col h-[90%] justify-evenly  ">
      
        <TextField
                    sx={{
                        width : "90%",
                        marginLeft :"25px",
                    }}
                      value={Name}
                      onChange={(e)=>(setName(e.target.value))}
                      type="text"
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"

                    />
        <TextField
                    sx={{
                        width : "90%",
                        marginLeft :"25px",
                    }}
                      value={Name}
                      onChange={(e)=>(setName(e.target.value))}
                      type="text"
                      id="outlined-basic"
                      label="Your Issue"
                      variant="outlined"

                    />
        <TextField
                    sx={{
                        width : "90%",
                        marginLeft :"25px",
                    }}
                      value={Name}
                      onChange={(e)=>(setName(e.target.value))}
                      type="text"
                      id="outlined-basic"
                      label="Bus Number"
                      variant="outlined"

                    />
        

        <div className="text-center w-full mb-4">
          <Button
          type="submit"
            sx={{
                background:'#EF4444',
              padding: "10px",
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SOS;
