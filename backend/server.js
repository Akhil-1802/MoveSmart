const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require('./Routes/user.routes')
const driverRoutes = require('./Routes/driver.routes')
const cors = require("cors");
const dbconnect = require("./connections/db.connect");

const http = require("http");
const { Server } = require("socket.io");
app.use(express.json());

dotenv.config(); // Load environment variables

// Create an HTTP server and attach Express
const server = http.createServer(app);

// Use dynamic CORS origin based on environment variables or allow all origins
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*"; // Default to '*' if not set
const io = new Server(server, {
  cors: {
    origin: allowedOrigin, // Allow connections from allowedOrigin
    methods: ["GET", "POST"],
  },
});

// Use CORS middleware for all routes
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Listen for location updates
  socket.on("busLocation", (data) => {
    console.log("Location Update:", data);

    // Validate the data before emitting
    if (data.lat && data.lng) {
      io.emit("busLocation", data);
    } else {
      console.error("Invalid bus location data:", data); // Log if data is invalid
    }
  });
});

// Load routes
app.use('/user',userRoutes);
app.use('/driver',driverRoutes);
app.use(express.urlencoded({ extended: true }));

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable for the port
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Connect to the database
  dbconnect();
});
