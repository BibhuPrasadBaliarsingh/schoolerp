import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, unique: true, required: true },
    driverName: String,
    driverPhone: String,
    capacity: Number,
    route: String,
    routeWaypoints: [
      {
        latitude: Number,
        longitude: Number,
        name: String,
      },
    ],
    currentLocation: {
      latitude: Number,
      longitude: Number,
      lastUpdated: Date,
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    gpsDeviceId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
