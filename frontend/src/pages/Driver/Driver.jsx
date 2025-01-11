import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import io from "socket.io-client";
function Driver() {
  
  
  const setupSocketConnection = () => {
    const socket = io("http://localhost:3000");

    socket.emit("updateLocation", {busId:"UP@#",latitude: 28.7041, longitude: 79.1165})

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      alert("Unable to connect to the bus tracking server.");
    });
  };
  const disconnect = () => {
    const socket = io("http://localhost:3000");
    socket.emit('disconnect')
  }

  return (
    <div>
      <Button onClick={setupSocketConnection}>CLick to activate</Button>
      <Button onClick={disconnect}>CLick to Deactivate</Button>
      
    </div>
  )
}

export default Driver
