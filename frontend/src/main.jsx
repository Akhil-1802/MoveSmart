import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BusTrackingMap, Driver, DriverLogin, User, UserLogin, UserRegister } from "./pages/index.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import {ToastContainer} from 'react-toastify'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:'/user',
    element : <><User /></>
  },
  {
    path: "/userlogin",
    element: (
      <>
        <UserLogin/>
      </>
    ),
  },
  {
    path: "/userregister",
    element: (
      <>
        <UserRegister/>
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
    element : <BusTrackingMap/>
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
