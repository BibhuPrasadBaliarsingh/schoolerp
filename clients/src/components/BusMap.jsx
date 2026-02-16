import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBus, FaMapMarkerAlt } from "react-icons/fa";

// Custom bus icon
const busIcon = new L.DivIcon({
  html: `<div style="background-color: #2563eb; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 3px solid white; font-weight: bold; font-size: 20px;">🚌</div>`,
  iconSize: [40, 40],
  className: "custom-bus-icon",
});

// Custom waypoint icon
const waypointIcon = new L.DivIcon({
  html: `<div style="background-color: #10b981; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.2); border: 2px solid white; font-size: 14px;">📍</div>`,
  iconSize: [32, 32],
  className: "custom-waypoint-icon",
});

const BusMap = ({ bus }) => {
  if (!bus || !bus.currentLocation) {
    return <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">No bus data available</div>;
  }

  const { latitude, longitude } = bus.currentLocation;
  const waypoints = bus.routeWaypoints || [];

  // Create polyline coordinates from waypoints
  const polylineCoords = waypoints.map((wp) => [wp.latitude, wp.longitude]);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-full">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        {/* Map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Route polyline */}
        {polylineCoords.length > 0 && (
          <Polyline
            positions={polylineCoords}
            color="#3b82f6"
            weight={3}
            opacity={0.7}
            dashArray="10, 5"
            lineCap="round"
            lineJoin="round"
          />
        )}

        {/* Waypoints */}
        {waypoints.map((waypoint, idx) => (
          <Marker
            key={idx}
            position={[waypoint.latitude, waypoint.longitude]}
            icon={waypointIcon}
          >
            <Popup>
              <div className="text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" size={14} />
                  {waypoint.name}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Current bus location */}
        <Marker position={[latitude, longitude]} icon={busIcon}>
          <Popup>
            <div className="text-sm">
              <div className="font-bold flex items-center gap-2 mb-2">
                <FaBus className="text-blue-600" size={16} />
                {bus.registrationNumber}
              </div>
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Driver:</span> {bus.driverName}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {bus.driverPhone}
                </p>
                <p>
                  <span className="font-semibold">Route:</span> {bus.route}
                </p>
                <p>
                  <span className="font-semibold">Capacity:</span> {bus.capacity} seats
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-bold ${
                      bus.status === "active" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {bus.status.toUpperCase()}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Last updated: {new Date(bus.currentLocation.lastUpdated).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default BusMap;
