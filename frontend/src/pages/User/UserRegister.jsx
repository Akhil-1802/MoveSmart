import { Button, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const Navigate = useNavigate();
  const [form, setform] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
  });
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const registeruser = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });
    if (response.ok) {
      toast.success("Registeration Done", {
        position: "top-center",
        autoClose: 2000,
      });
      Navigate("/userlogin");
    }
  };
  return (
    <div style={{ backgroundColor: "#0a0e27" }} className="min-h-screen flex">
      <div className="w-1/2 m-auto h-[500px] backdrop-blur-lg bg-white flex text-white">
        <div
          className="w-1/2 flex justify-center items-center"
          style={{ backgroundColor: "#0a0e32" }}
        >
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-3xl">Welcome to Register</h2>
            <div className="flex flex-col justify-center items-center gap-2">
              <span>Already have an account?</span>
              <span className="text-center">
                <Link to={"/userlogin"}>
                  <button
                    type="button"
                    className="text-white bg-transparent border-2  font-medium rounded-full hover:bg-white hover:text-black text-sm px-5 py-2  text-center me-2 mb-2"
                  >
                    Login
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2 text-black">
          <div className="h-10 my-3 text-center flex items-center justify-center">
            <h2 className="text-3xl underline font-bold">Register</h2>
          </div>
          <form onSubmit={registeruser} className="flex flex-col justify-evenly h-[80%] ">
            <TextField
              sx={{
                width: "80%",
                marginLeft: "25px",
              }}
              value={form.Name}
              onChange={handlechange}
              type="text"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="Name"
            />
            <TextField
              sx={{
                width: "80%",
                marginLeft: "25px",
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
                width: "80%",
                marginLeft: "25px",
              }}
              value={form.Phone}
              onChange={handlechange}
              type="text"
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              name="Phone"
            />
            <TextField
              sx={{
                width: "80%",
                marginLeft: "25px",
              }}
              value={form.Password}
              onChange={handlechange}
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="Password"
            />
            <div className="text-center">
              <Button
              type="submit"
                sx={{
                  background: "#0a0e64",
                  width: "100px",
                  height: "40px",
                }}
                variant="contained"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
