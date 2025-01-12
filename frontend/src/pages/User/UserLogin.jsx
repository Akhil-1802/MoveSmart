import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const UserLogin = () => {
  const [form, setform] = useState({ Email: "", password: "" });
  const Navigate = useNavigate();
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const userlogin = async (e) => {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/user/login/${form.Email}/${form.password}`, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
        console.log(response)
        Navigate('/user')
        toast.success('Login Done',{
            autoClose:2000,
            position:'top-center'
        })  
    }
  };

  return (
    <div style={{ backgroundColor: "#0a0e27" }} className="min-h-screen flex">
      <div className="w-1/2 m-auto h-96 backdrop-blur-lg bg-white flex text-white">
        <form onSubmit={userlogin} className="w-1/2 text-black">
          <div className="h-32 text-center flex items-center justify-center">
            <h2 className="text-3xl underline font-bold">Login</h2>
          </div>
          <div className="flex flex-col gap-5 ">
            <TextField
            sx={{
                width : "80%",
                marginLeft :"25px",
            }}
              value={form.Email}
              onChange={handlechange}
              type="text"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="Email"
            />
            <TextField
            sx={{
                width : "80%",
                marginLeft :"25px"
            }}
              value={form.password}
              onChange={handlechange}
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
            />
          </div>
          <div className="text-center mt-8">
            <Button type="submit" sx={{
                background : '#0a0e64',
                width:'100px',
                height:"40px"
            }} variant="contained">Login</Button>
          </div>
          
        </form>
        <div
          className="w-1/2 flex justify-center items-center"
          style={{ backgroundColor: "#0a0e32" }}
        >
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-3xl">Welcome To Login</h2>
            <div className="flex flex-col justify-center items-center gap-2">
              <span>Dont't have an account?</span>
              <span className="text-center">
                <Link to={"/userregister"}>
                  <button
                    type="button"
                    className="text-white bg-transparent border-2  font-medium rounded-full hover:bg-white hover:text-black text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Register
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
