const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const dbconnect = require("./connections/db.connect");
const userRoutes = require('./Routes/user.routes');
const driverRoutes = require('./Routes/driver.routes');
const busRoutes = require('./Routes/email.routes');
const http = require("http");
const { Server } = require("socket.io");

dotenv.config(); // Load environment variables
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

const allowedOrigin = 'http://localhost:5173'; 
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Load routes
app.use('/user', userRoutes);
app.use('/driver', driverRoutes);
app.use('/sendConfirmationEmail', busRoutes);

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("busLocation", (data) => {
    console.log("Location Update:", data);
    if (data.lat && data.lng) {
      io.emit("busLocation", data);
    } else {
      console.error("Invalid bus location data:", data);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  dbconnect();
});
