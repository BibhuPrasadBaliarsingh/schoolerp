import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    position: String,
    department: String,
    dateOfJoining: Date,
    salary: Number,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    profilePic: String,
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);
