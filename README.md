# Move Smart - Bus Tracking & Management System

A comprehensive bus tracking and management system with real-time location tracking, ticket booking, and multi-role authentication for users, drivers, and administrators.

## Features

### User Features
- **User Authentication** - Secure registration and login
- **Real-time Bus Tracking** - Track bus location on interactive maps
- **Ticket Booking** - Book bus tickets with email confirmation
- **Feedback System** - Submit feedback and ratings
- **SOS Emergency** - Emergency alert system for safety

### Driver Features
- **Driver Portal** - Dedicated dashboard for drivers
- **Location Sharing** - Real-time location updates via Socket.IO
- **Route Management** - View and manage assigned routes
- **Authentication** - Secure driver login and registration

### Admin Features
- **Admin Dashboard** - Comprehensive analytics and overview
- **Driver Management** - Add, view, and manage drivers
- **Issue Tracking** - Monitor and resolve user issues
- **Bus Management** - Manage bus fleet and routes
- **Real-time Monitoring** - Track all buses and drivers

### Technical Features
- **Real-time Communication** - Socket.IO for live location updates
- **Email Notifications** - Automated booking confirmations via Nodemailer
- **Responsive Design** - Mobile-friendly interface with Tailwind CSS
- **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- **Interactive Maps** - React Leaflet for map visualization

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Material-UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **React Leaflet** - Map integration
- **Recharts** - Data visualization
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Socket.IO** - WebSocket server
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

## Project Structure

```
MiniProject/
├── backend/
│   ├── connections/        # Database connection
│   ├── Controllers/        # Business logic
│   ├── models/            # MongoDB schemas
│   ├── Routes/            # API routes
│   ├── server.js          # Entry point
│   └── nodemail.js        # Email configuration
│
└── frontend/
    ├── src/
    │   ├── pages/         # Page components
    │   ├── components/    # Reusable components
    │   ├── context/       # React context
    │   └── utils/         # Utility functions
    └── public/            # Static assets
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bus-tracking
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

## API Endpoints

### User Routes (`/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `POST /feedback` - Submit feedback
- `POST /sos` - Emergency SOS alert

### Driver Routes (`/driver`)
- `POST /register` - Driver registration
- `POST /login` - Driver login
- `GET /profile` - Get driver profile
- `PUT /location` - Update location

### Admin Routes (`/admin`)
- `POST /login` - Admin login
- `GET /drivers` - Get all drivers
- `POST /drivers` - Add new driver
- `GET /issues` - View all issues
- `GET /analytics` - Dashboard analytics

### Email Routes
- `POST /sendConfirmationEmail` - Send booking confirmation

## Real-time Features

The application uses Socket.IO for real-time communication:

- **Bus Location Updates** - Drivers emit location updates
- **Live Tracking** - Users receive real-time bus positions
- **Event: `busLocation`** - Driver sends location
- **Event: `locationUpdate`** - Broadcast to all clients

## Development

### Run Backend in Development Mode
```bash
cd backend
npm run dev
```

### Run Frontend in Development Mode
```bash
cd frontend
npm run dev
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- CORS configuration
- Environment variable protection
- Input validation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC

## Authors

Akhil Maindola

## Support

For issues and questions, please create an issue in the repository.
