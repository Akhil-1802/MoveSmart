import { Link, Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { User } from "./pages";
import { Button } from "@mui/material";
import { useEffect } from "react";
import './App.css'
function App() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  
  return (
    <div className="">
      <div className="relative h-[80vh] w-screen overflow-hidden flex flex-col">
        <div className="text-slate-200 gap-10 z-20 h-[100vh] w-full flex flex-col justify-center items-center ">

          <h1 className="font-serif text-8xl">MOVE SMART</h1>
          <div className="flex w-[80vw] justify-evenly">
            <Link to={"/userlogin"}>
              <Button
                sx={{
                  borderRadius: "10px",
                  width: "300px",
                  height: "120px",
                  fontSize: "25px",
                  fontWeight: "semi-bold",
                  transition: "transform 0.3s ease, background-color 0.3s ease", // Add transition for smooth effect
                }}
                variant="contained"
                className="button-hover"
              >
                User
              </Button>
            </Link>
            <Link to={"/driverlogin"}>
              <Button
                sx={{
                  borderRadius: "10px",
                  width: "300px",
                  height: "120px",
                  fontSize: "25px",
                  background: "#aa2727",
                  fontWeight: "semi-bold",
                  transition: "transform 0.3s ease, background-color 0.3s ease", // Add transition for smooth effect
                }}
                variant="contained"
                className="button-hover"
              >
                Driver
              </Button>
            </Link>
            <Link to={"/adminlogin"}>
              <Button
                sx={{
                  borderRadius: "10px",
                  width: "300px",
                  height: "120px",
                  fontSize: "25px",
                  background: "green",
                  fontWeight: "semi-bold",
                  transition: "transform 0.3s ease, background-color 0.3s ease", // Add transition for smooth effect
                }}
                variant="contained"
                className="button-hover"
              >
                Admin
              </Button>
            </Link>
          </div>
        </div>

        <video
          src="/background.mp4"
          autoPlay
          muted
          loop
          className="absolute z-10 inset-0 h-full 
                      w-full object-cover "
        ></video>
      </div>
      <div className="flex justify-evenly items-center mt-5">
        <img width={100} height={100} src="/logo1.jpg" alt="" />
        <img width={100} height={100} src="/logo2.png" alt="" />
        <img width={100} height={100} src="/logo3.png" alt="" />
        <img width={100} height={100} src="/logo.png" alt="" />
      </div>
    </div>
  );
}

export default App;
