import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: String,
    role: { type: String, enum: ["admin", "teacher", "student"], default: "student" },
    profilePic: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
