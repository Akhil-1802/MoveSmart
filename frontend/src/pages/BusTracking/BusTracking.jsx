import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const BusTracker = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef({});
  const busPaths = useRef({});
  const busIcons = useRef({});
  const userMarker = useRef(null);
  const isFirstUpdate = useRef(true);
    console.log(markers)
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.bing.com/api/maps/mapcontrol?key=ArSGwElpgs65UXUwCnZ4ibhLzkmxuScTxz0rCq_kgJy35pa2tSq229GIMzMPVQ8P&callback=initializeMap";
    script.async = true;
    window.initializeMap = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      localStorage.clear();
    };
  }, []);

  const initializeMap = () => {
    const Microsoft = window.Microsoft;
    mapInstance.current = new Microsoft.Maps.Map(mapRef.current, {
      center: new Microsoft.Maps.Location(28.7041, 77.1025),
      zoom: 15,
      mapTypeId: Microsoft.Maps.MapTypeId.road,
    });

    setupSocketConnection();
    showUserLocation();
  };

  const setupSocketConnection = () => {
    const socket = io("http://localhost:3000");

    socket.on("locationUpdate", (data) => {
        console.log(data)
      const { busId, latitude, longitude } = data;
      updateBusMarker(busId, latitude, longitude);
      updatePolyline(busId, latitude, longitude);
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      alert("Unable to connect to the bus tracking server.");
    });
  };

  const updateBusMarker = (busId, latitude, longitude) => {
    const Microsoft = window.Microsoft;
    const location = new Microsoft.Maps.Location(latitude, longitude);

    if (!markers.current[busId]) {
      const pushpin = new Microsoft.Maps.Pushpin(location, { visible: false });
      mapInstance.current.entities.push(pushpin);
      markers.current[busId] = pushpin;

      const icon = createBusIcon();
      busIcons.current[busId] = icon;
      document.getElementById("map-container").appendChild(icon);
      updateIconPosition(icon, location);

      if (isFirstUpdate.current) {
        mapInstance.current.setView({ center: location, zoom: 15 });
        isFirstUpdate.current = false;
      }
    } else {
      smoothlyUpdateMarker(busId, latitude, longitude);
    }
  };

  const updatePolyline = (busId, latitude, longitude) => {
    const Microsoft = window.Microsoft;
    const storedCoordinates = JSON.parse(localStorage.getItem(busId)) || [];
    storedCoordinates.push({ latitude, longitude });

    if (storedCoordinates.length > 100) storedCoordinates.shift();
    localStorage.setItem(busId, JSON.stringify(storedCoordinates));

    if (!busPaths.current[busId]) {
      busPaths.current[busId] = new Microsoft.Maps.Polyline([], {
        strokeColor: "blue",
        strokeThickness: 4,
        strokeDashArray: [4, 4],
      });
      mapInstance.current.entities.push(busPaths.current[busId]);
    }

    const path = storedCoordinates.map(
      (coord) => new Microsoft.Maps.Location(coord.latitude, coord.longitude)
    );
    busPaths.current[busId].setLocations(path);
  };

  const showUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = new window.Microsoft.Maps.Location(
          position.coords.latitude,
          position.coords.longitude
        );

        if (!userMarker.current) {
          userMarker.current = new window.Microsoft.Maps.Pushpin(userLocation, {
            color: "red",
            title: "You are here",
          });
          mapInstance.current.entities.push(userMarker.current);
        } else {
          userMarker.current.setLocation(userLocation);
        }

        mapInstance.current.setView({ center: userLocation, zoom: 15 });
      });
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  const createBusIcon = () => {
    const div = document.createElement("div");
    div.className = "bus-icon";
    div.innerHTML =
      '<img src="https://cdn.iconscout.com/icon/free/png-512/free-bus-icon-download-in-svg-png-gif-file-formats--back-city-basic-icons-pack-industry-449853.png?f=webp&w=256" alt="Bus Icon" />';
    return div;
  };

  const updateIconPosition = (icon, location) => {
    const Microsoft = window.Microsoft;
    const point = mapInstance.current.tryLocationToPixel(location, Microsoft.Maps.PixelReference.control);
    if (point) {
      icon.style.left = `${point.x}px`;
      icon.style.top = `${point.y}px`;
    }
  };

  const smoothlyUpdateMarker = (busId, newLat, newLng, duration = 500) => {
    const Microsoft = window.Microsoft;
    const icon = busIcons.current[busId];
    if (!icon) return;

    const startTime = Date.now();
    const startLat = markers.current[busId].getLocation().latitude;
    const startLng = markers.current[busId].getLocation().longitude;

    function animate() {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentLat = lerp(startLat, newLat, easeProgress);
      const currentLng = lerp(startLng, newLng, easeProgress);

      const location = new Microsoft.Maps.Location(currentLat, currentLng);
      markers.current[busId].setLocation(location);

      updateIconPosition(icon, location);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    animate();
  };

  const lerp = (start, end, t) => start + (end - start) * t;

  return <div id="map-container" style={{ width: "100%", height: "100vh" }} ref={mapRef}></div>;
};

export default BusTracker;
