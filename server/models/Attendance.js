import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    
    date: { type: Date, required: true },
    
    status: { type: String, enum: ["present", "absent", "late", "half-day", "leave"], required: true },
    
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // For subject-wise attendance
    period: Number,
    
    remarks: String,
    
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    leaveApplication: {
      reason: String,
      appliedBy: String, // Parent/Student
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "approved", "rejected"] }
    },
    
    academicYear: String
  },
  { timestamps: true }
);

// Compound index for student, date, and period
attendanceSchema.index({ student: 1, date: 1, period: 1 }, { unique: true, sparse: true });

export default mongoose.model("Attendance", attendanceSchema);
