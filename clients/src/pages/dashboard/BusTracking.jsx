import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import BusMap from "../../components/BusMap";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { FaBus, FaMapMarkerAlt, FaSync } from "react-icons/fa";

const BusTracking = () => {
  const { user } = useContext(AuthContext);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [form, setForm] = useState({
    registrationNumber: "",
    driverName: "",
    driverPhone: "",
    capacity: "",
    route: "",
  });
  const [editing, setEditing] = useState(null);
  const [tracking, setTracking] = useState(null);

  const fetchBuses = async () => {
    try {
      const res = await api.get("/api/buses");
      setBuses(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch buses");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Simulate real-time location updates
  useEffect(() => {
    if (!tracking) return;

    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => {
          if (bus._id === tracking) {
            return {
              ...bus,
              currentLocation: {
                latitude: bus.currentLocation.latitude + (Math.random() - 0.5) * 0.01,
                longitude: bus.currentLocation.longitude + (Math.random() - 0.5) * 0.01,
                lastUpdated: new Date().toISOString(),
              },
            };
          }
          return bus;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [tracking]);

  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleLocationChange = (e, field) => {
    const busId = e.target.dataset.id;
    setBuses((prev) =>
      prev.map((bus) => {
        if (bus._id === busId) {
          return {
            ...bus,
            currentLocation: {
              ...bus.currentLocation,
              [field]: parseFloat(e.target.value),
            },
          };
        }
        return bus;
      })
    );
  };

  const updateLocation = async (busId) => {
    try {
      const bus = buses.find((b) => b._id === busId);
      await api.patch(`/api/buses/${busId}`, {
        currentLocation: {
          ...bus.currentLocation,
          lastUpdated: new Date().toISOString(),
        },
      });
      toast.success("Location updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.registrationNumber || !form.driverName) {
      return toast.error("Fill required fields");
    }
    setLoading(true);
    try {
      if (editing) {
        await api.patch(`/api/buses/${editing._id}`, form);
        toast.success("Bus updated");
      } else {
        await api.post("/api/buses", {
          ...form,
          capacity: parseInt(form.capacity) || 50,
          currentLocation: { latitude: 0, longitude: 0, lastUpdated: new Date().toISOString() },
          status: "active",
        });
        toast.success("Bus added");
      }
      setForm({ registrationNumber: "", driverName: "", driverPhone: "", capacity: "", route: "" });
      setEditing(null);
      fetchBuses();
    } catch {
      toast.error("Failed to save bus");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this bus?")) return;
    try {
      await api.delete(`/api/buses/${id}`);
      toast.success("Bus deleted");
      fetchBuses();
    } catch {
      toast.error("Delete failed");
    }
  };

  const startEdit = (bus) => {
    setEditing(bus);
    setForm({
      registrationNumber: bus.registrationNumber,
      driverName: bus.driverName,
      driverPhone: bus.driverPhone || "",
      capacity: bus.capacity,
      route: bus.route || "",
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ registrationNumber: "", driverName: "", driverPhone: "", capacity: "", route: "" });
  };

  if (!user) {
    return <p className="p-6">Please login to access bus tracking</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar role={user?.role} />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">🚌 Live Bus Tracking</h1>

          {/* Map View */}
          {selectedBus && (
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  📍 {selectedBus.registrationNumber} - {selectedBus.route}
                </h2>
                <button
                  onClick={() => setSelectedBus(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close Map
                </button>
              </div>
              <div style={{ height: "500px", width: "100%" }}>
                <BusMap bus={selectedBus} />
              </div>
            </div>
          )}

          {/* Add Bus Form - Admin Only */}
          {user?.role === "admin" && (
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-4">{editing ? "Edit Bus" : "Add New Bus"}</h2>
              <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="registrationNumber"
                  placeholder="Registration Number (e.g., DL-01-AB-1234)"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <input
                  name="driverName"
                  placeholder="Driver Name"
                  value={form.driverName}
                  onChange={handleChange}
                  className="input"
                  required
                />
                <input
                  name="driverPhone"
                  placeholder="Driver Phone"
                  value={form.driverPhone}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="capacity"
                  type="number"
                  placeholder="Capacity (seats)"
                  value={form.capacity}
                  onChange={handleChange}
                  className="input"
                />
                <input
                  name="route"
                  placeholder="Route (e.g., South Delhi - West Delhi)"
                  value={form.route}
                  onChange={handleChange}
                  className="input md:col-span-2"
                />
                <div className="flex gap-2 md:col-span-2">
                  <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    {loading ? "Saving..." : editing ? "Update Bus" : "Add Bus"}
                  </button>
                  {editing && (
                    <button type="button" onClick={cancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Buses List */}
          <div className="space-y-4">
            {buses.length === 0 ? (
              <p className="text-gray-500">No buses registered yet</p>
            ) : (
              buses.map((bus) => (
                <div key={bus._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Bus Info */}
                    <div>
                      <p className="font-bold flex items-center gap-2">
                        <FaBus className="text-blue-600" /> {bus.registrationNumber}
                      </p>
                      <p className="text-sm text-gray-600">Driver: {bus.driverName}</p>
                      <p className="text-sm text-gray-600">Phone: {bus.driverPhone || "N/A"}</p>
                      <p className="text-sm text-gray-600">Capacity: {bus.capacity} seats</p>
                      <p className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-2 inline-block">
                        {bus.status === "active" ? "🟢 Active" : "🔴 Inactive"}
                      </p>
                    </div>

                    {/* Route Info */}
                    <div>
                      <p className="font-semibold text-gray-700">Route</p>
                      <p className="text-sm">{bus.route || "Not specified"}</p>
                      <p className="font-semibold text-gray-700 mt-2">Last Updated</p>
                      <p className="text-xs text-gray-500">
                        {new Date(bus.currentLocation?.lastUpdated).toLocaleTimeString()}
                      </p>
                    </div>

                    {/* Live Location */}
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="font-semibold flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-600" /> Live Location
                      </p>
                      <p className="text-sm mt-2">
                        <strong>Latitude:</strong>{" "}
                        {user?.role === "admin" ? (
                          <input
                            type="number"
                            step="0.0001"
                            value={bus.currentLocation?.latitude || 0}
                            onChange={(e) => handleLocationChange(e, "latitude")}
                            data-id={bus._id}
                            className="w-24 px-2 py-1 border rounded text-sm"
                          />
                        ) : (
                          <span className="font-mono">{bus.currentLocation?.latitude || 0}</span>
                        )}
                      </p>
                      <p className="text-sm mt-1">
                        <strong>Longitude:</strong>{" "}
                        {user?.role === "admin" ? (
                          <input
                            type="number"
                            step="0.0001"
                            value={bus.currentLocation?.longitude || 0}
                            onChange={(e) => handleLocationChange(e, "longitude")}
                            data-id={bus._id}
                            className="w-24 px-2 py-1 border rounded text-sm"
                          />
                        ) : (
                          <span className="font-mono">{bus.currentLocation?.longitude || 0}</span>
                        )}
                      </p>
                      {user?.role === "admin" && (
                        <button
                          onClick={() => updateLocation(bus._id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm mt-2 flex items-center gap-1 hover:bg-yellow-600"
                        >
                          <FaSync /> Update
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tracking Toggle & Actions */}
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedBus(bus)}
                      className="px-4 py-2 rounded text-white bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                    >
                      📍 View on Map
                    </button>
                    <button
                      onClick={() => setTracking(tracking === bus._id ? null : bus._id)}
                      className={`px-4 py-2 rounded text-white ${
                        tracking === bus._id
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {tracking === bus._id ? "Stop Tracking" : "Start Tracking"}
                    </button>
                    {user?.role === "admin" && (
                      <>
                        <button
                          onClick={() => startEdit(bus)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => remove(bus._id)}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>

                  {tracking === bus._id && (
                    <div className="mt-3 p-2 bg-green-50 border border-green-300 rounded text-sm text-green-700">
                      📍 Real-time tracking active - Location updates every 3 seconds
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BusTracking;
