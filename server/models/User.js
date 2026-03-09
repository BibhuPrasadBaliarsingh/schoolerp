import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: String,
    role: { type: String, enum: ["admin", "teacher", "student", "parent"], default: "student" },
    
    // Personal Information
    firstName: String,
    lastName: String,
    phone: String,
    profilePic: String,
    
    // Additional fields
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
    
    // For teacher role
    teacherInfo: {
      employeeId: String,
      department: String,
      subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
      qualification: String,
      experience: Number
    },
    
    // For parent role
    parentInfo: {
      children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
      occupation: String,
      address: String
    },
    
    // Notification preferences
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
