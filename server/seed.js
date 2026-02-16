import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Fee from "./models/Fee.js";
import Bus from "./models/Bus.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Fee.deleteMany({});
    await Bus.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const users = await User.create([
      {
        email: "admin@school.com",
        password: "123456",
        username: "Admin User",
        role: "admin",
      },
      {
        email: "teacher@school.com",
        password: "123456",
        username: "John Teacher",
        role: "teacher",
      },
      {
        email: "student@school.com",
        password: "123456",
        username: "Jane Student",
        role: "student",
      },
      {
        email: "student2@school.com",
        password: "123456",
        username: "Bob Student",
        role: "student",
      },
    ]);

    console.log("Created users:", users.length);

    // Create fees
    const fees = await Fee.create([
      {
        studentId: users[2]._id,
        studentName: users[2].username,
        amount: 5000,
        dueDate: new Date("2026-02-28"),
        status: "pending",
      },
      {
        studentId: users[3]._id,
        studentName: users[3].username,
        amount: 5000,
        dueDate: new Date("2026-03-31"),
        status: "paid",
        paidDate: new Date("2026-02-05"),
      },
    ]);

    console.log("Created fees:", fees.length);

    // Create buses
    const buses = await Bus.create([
      {
        registrationNumber: "DL-01-AB-1234",
        driverName: "Rajesh Kumar",
        driverPhone: "9876543210",
        capacity: 50,
        route: "South Delhi - North Delhi",
        routeWaypoints: [
          { latitude: 28.5244, longitude: 77.1855, name: "South Delhi School" },
          { latitude: 28.5535, longitude: 77.2075, name: "Greater Kailash" },
          { latitude: 28.5891, longitude: 77.2161, name: "Sector 7, Dwarka" },
          { latitude: 28.6139, longitude: 77.209, name: "Central Stop" },
          { latitude: 28.6432, longitude: 77.2197, name: "North Delhi Terminal" },
        ],
        currentLocation: {
          latitude: 28.6139,
          longitude: 77.209,
          lastUpdated: new Date().toISOString(),
        },
        status: "active",
        gpsDeviceId: "GPS-001",
      },
      {
        registrationNumber: "DL-02-CD-5678",
        driverName: "Amit Singh",
        driverPhone: "9876543211",
        capacity: 45,
        route: "East Delhi - West Delhi",
        routeWaypoints: [
          { latitude: 28.6097, longitude: 77.3196, name: "East Delhi Campus" },
          { latitude: 28.6118, longitude: 77.2935, name: "Mehrauli Road" },
          { latitude: 28.6207, longitude: 77.2532, name: "Connaught Place" },
          { latitude: 28.6329, longitude: 77.2197, name: "India Gate" },
          { latitude: 28.6398, longitude: 77.1957, name: "West Delhi Hub" },
        ],
        currentLocation: {
          latitude: 28.6329,
          longitude: 77.2197,
          lastUpdated: new Date().toISOString(),
        },
        status: "active",
        gpsDeviceId: "GPS-002",
      },
      {
        registrationNumber: "DL-03-EF-9012",
        driverName: "Vikram Patel",
        driverPhone: "9876543212",
        capacity: 55,
        route: "Central Delhi - Suburbs",
        routeWaypoints: [
          { latitude: 28.5244, longitude: 77.2055, name: "City Center School" },
          { latitude: 28.5391, longitude: 77.2552, name: "South Extension" },
          { latitude: 28.5535, longitude: 77.391, name: "Suburbs Area" },
          { latitude: 28.5680, longitude: 77.3750, name: "Outer Ring Road" },
          { latitude: 28.5830, longitude: 77.3590, name: "Suburban Terminal" },
        ],
        currentLocation: {
          latitude: 28.5535,
          longitude: 77.391,
          lastUpdated: new Date().toISOString(),
        },
        status: "inactive",
        gpsDeviceId: "GPS-003",
      },
    ]);

    console.log("Created buses:", buses.length);
    console.log("\n✅ Seed completed successfully!");
    console.log("\nDemo Accounts:");
    console.log("Admin: admin@school.com / 123456");
    console.log("Teacher: teacher@school.com / 123456");
    console.log("Student: student@school.com / 123456");

    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
