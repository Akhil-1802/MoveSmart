const express = require('express')
const dotenv = require('dotenv')
const http = require('http')
const {Server} = require('socket.io')
dotenv.config()
const cors = require('cors')
const MongoDBConnection = require('./connections/db.connect')
const PORT = process.env.PORT || 8000
const driverRoutes = require('./Routes/driver.routes')
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (use specific domains in production)
        credentials:true
    },
});
app.use(cors({
    origin: "http://localhost:5173", // Adjust for your frontend URL
    credentials: true, // To allow credentials like cookies, authentication headers
}));
app.use(express.json())
app.use('/driver',driverRoutes)
// Dummy bus locations
let buses = {
    bus1: { latitude: 28.7041, longitude: 77.1025 }, // Example coordinates (New Delhi)
    bus2: { latitude: 28.5355, longitude: 77.3910 }, // Example coordinates (Noida)
};

// API Route to fetch bus data (optional)
app.get("/api/buses", (req, res) => {
    res.json(buses);
});

// Handle client connections
io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Send initial bus locations when a client connects
    socket.emit("initialData", buses);

    // Listen for updates from bus trackers (simulated in this example)
    socket.on("updateLocation", ({ busId, latitude, longitude }) => {
        console.log(`Location update for ${busId}: ${latitude}, ${longitude}`);

        // Update the location in the server's memory
        buses[busId] = { latitude, longitude };

        // Broadcast the update to all clients
        io.emit("locationUpdate", { busId, latitude, longitude });
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

server.listen(PORT,()=>{
    MongoDBConnection()
    console.log(`App is listening at ${PORT}`)
})
