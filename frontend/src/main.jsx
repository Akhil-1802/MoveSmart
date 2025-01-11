import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Driver, DriverLogin, User } from "./pages/index.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import BusTracking from "./pages/BusTracking/BusTracking.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: (
      <>
        <Navbar />
        <User />
        <Footer/>
      </>
    ),
  },
  {
    path: "/driverlogin",
    element: <DriverLogin />,
  },
  {
    path: "/driver",
    element: <Driver/>,
  },
  {
    path : '/bustracking',
    element : <BusTracking/>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
