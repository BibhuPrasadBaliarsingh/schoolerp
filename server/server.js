import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import feeRoutes from "./routes/fees.js";
import incomeExpenseRoutes from "./routes/incomeExpense.js";
import staffRoutes from "./routes/staff.js";
import assignmentRoutes from "./routes/assignments.js";
import busRoutes from "./routes/buses.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/income-expense", incomeExpenseRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/buses", busRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "School ERP Backend is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
