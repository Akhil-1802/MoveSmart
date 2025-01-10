import { Link, Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { User } from "./pages";
import { Button } from "@mui/material";
function App() {
  return (
    <div className="">
      <div className="mt-44 text-center">
        <h1 className="text-9xl font-serif ">I am a ...</h1>
      </div>
      <div className="flex gap-4 mx-20 mt-10">
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
  );
}

export default App;
