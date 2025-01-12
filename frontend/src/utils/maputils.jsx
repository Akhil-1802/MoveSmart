import L from 'leaflet';

export const busIcon = new L.Icon({
  iconUrl: 'https://cdn.iconscout.com/icon/free/png-512/free-bus-icon-download-in-svg-png-gif-file-formats--back-city-basic-icons-pack-industry-449853.png?f=webp&w=256',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const calculateETA = (distance, speed) => {
  console.log("Input speed (km/h):", speed);

  // Handle cases where speed is 0, undefined, or invalid
  if (!speed || speed <= 0) {
    console.log("Speed is zero or invalid, returning null.");
    return null;
  }

  try {
    // Convert speed from km/h to m/s, ensuring precision for small speeds
    const speedInMS = (speed * 1000) / 3600; // km/h to m/s
    console.log("Converted speed (m/s):", speedInMS);

    // Check if speedInMS is too small to compute
    if (speedInMS <= 0) {
      console.log("Speed in m/s is too small, returning null.");
      return null;
    }

    // Calculate ETA in minutes, maintaining precision for small speed
    const etaMinutes = Math.ceil((distance / speedInMS) / 60);
    console.log("Calculated ETA (minutes):", etaMinutes);

    // If ETA is invalid or zero, return null
    return etaMinutes > 0 ? etaMinutes : null;
  } catch (error) {
    console.error('Error calculating ETA:', error);
    return null;
  }
};

export const formatTime = (minutes) => {
  console.log("Input minutes for formatting:", minutes);

  // Handle null, undefined, or invalid input
  if (minutes === null || minutes === undefined || isNaN(minutes)) {
    console.log("Minutes are invalid, returning 'N/A'.");
    return 'N/A';
  }

  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hours === 0) {
    console.log("Formatted time (minutes):", `${mins}m`);
    return `${mins}m`;
  }

  console.log("Formatted time (hours and minutes):", `${hours}h ${mins}m`);
  return `${hours}h ${mins}m`;
};

// Helper function to format speed
export const formatSpeed = (speed) => {
  console.log("Input speed for formatting:", speed);

  if (speed === null || speed === undefined || isNaN(speed) || speed <= 0) {
    console.log("Speed is zero or invalid, returning '0.00'.");
    return '0.00';
  }

  const formattedSpeed = Number(speed).toFixed(6); 
  console.log("Formatted speed:", formattedSpeed);
  return formattedSpeed;
};
