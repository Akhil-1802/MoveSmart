import React, { useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
function Navbar({feedback , setFeedback, sos , setsos}) {
  const Routes = [
    {
      path: "/",
      Route: "Home",
    },
    {
      path: "/bustracking",
      Route: "Bus Tracking",
    },
    {
      path: "/bookticket",
      Route: "Book Ticket",
    },
    {
      path: "/",
      Route: "Help",
    },
  ];
  return (
    <header>
      <nav className="w-[80%] mx-auto flex justify-between items-center  p-4 mt-4 rounded-lg backdrop-blur-lg">
        <div className="flex items-center justify-center gap-10">
          <h1 className="text-2xl font-bold ">
            <img width={60} height={60} src="/logo.png" alt="" />
          </h1>
          <ul className=" flex gap-6 cursor-pointer max-md:hidden">
            {Routes.map((Route) => (
              <NavLink to={Route.path}>
                <li key={Route.Route}>{Route.Route}</li>
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="flex gap-6  items-center max-md:hidden">
          <NavLink >
            <Button onClick={() => (setsos( sos => !sos))} variant="contained">SOS</Button>
          </NavLink>
          <NavLink>
            <Button onClick={() => (setFeedback( feedback => !feedback))} variant="outlined">Feedback</Button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
