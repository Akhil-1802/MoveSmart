import { Link, Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { User } from "./pages";
import { Button } from "@mui/material";
function App() {
  return (
    <div className="">
      <div className="relative h-[80vh] w-screen overflow-hidden flex flex-col">
        <div className="text-white z-20 absolute top-[47%] right-[30%] font-serif text-8xl ">
          MOVE SMART
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
      <div className="w-full h-[2px] bg-slate-300 mt-20"></div>
      <div className="w-full h-[90vh] flex justify-center items-center flex-col gap-16">
        <div className="mt-20 text-center">
          <h1 className="text-9xl font-serif ">You are a ...</h1>
        </div>
        <div className="flex gap-4 mx-20 mb-20 ">
          <Link to={"/user"}>
            <Button
              sx={{
                width: "400px",
                height: "170px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
              variant="contained"
            >
              User
            </Button>
          </Link>
          <Link to={"/driverlogin"}>
            <Button
              sx={{
                width: "400px",
                height: "170px",
                fontSize: "30px",
                background: "#aa2727",
                fontWeight: "bold",
              }}
              variant="contained"
            >
              Driver
            </Button>
          </Link>
          <Link to={"/"}>
            <Button
              sx={{
                width: "400px",
                height: "170px",
                fontSize: "30px",
                background: "green",
                fontWeight: "bold",
              }}
              variant="contained"
            >
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
