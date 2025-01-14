import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Admin,
  AdminLogin,
  AdminRegister,
  BookTicket,
  BusTrackingMap,
  Driver,
  DriverLogin,
  DriverRegister,
  Issue,
  User,
  UserLogin,
  UserRegister,
} from "./pages/index.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import { Userprovider } from "../context/userContext.jsx";
import AddRoutes from "./components/AddRoutes.jsx";
import AdminPortal from "./pages/Admin/components_AdminPortal.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: (
      <>
        <User />
      </>
    ),
  },
  {
    path: "/userlogin",
    element: (
      <>
        <UserLogin />
      </>
    ),
  },
  {
    path: "/userregister",
    element: (
      <>
        <UserRegister />
      </>
    ),
  },
  {
    path: "/driverlogin",
    element: <DriverLogin />,
  },
  {
    path: "/driver/:busno",
    element: <Driver />,
  },
  {
    path: "/bustracking",
    element: <BusTrackingMap />,
  },
  {
    path:'/bookticket',
    element : <BookTicket/>
  },
  {
    path:"/adminlogin",
    element:<AdminLogin/>
  },
  // {
  //   path:"/adminregister",
  //   element:<AdminRegister/>
  // },
  {
    path:"/admin/:Email",
    element:<Admin/>
  },
  {
    path:'/admindriver/:Email',
    element:<AdminPortal/>
  },
  {
    path:'/driverRegister',
    element:<DriverRegister/>
  },
  {
    path:'/adminissue/:Email',
    element:<Issue />
  },
  {
    path:'/addroutes/:DriverID',
    element:<AddRoutes />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ToastContainer />
      <Userprovider>
      <RouterProvider router={router} />
      </Userprovider>
  </StrictMode>
);
