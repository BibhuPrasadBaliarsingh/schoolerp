import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: { type: String, required: true }, // e.g., "Class 1", "Class 10"
    section: { type: String, required: true }, // e.g., "A", "B", "C"
    academicYear: { type: String, required: true }, // e.g., "2025-2026"
    
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
    
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    
    capacity: { type: Number, default: 40 },
    
    room: String,
    
    timetable: [
      {
        day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] },
        periods: [
          {
            periodNumber: Number,
            subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
            teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            startTime: String,
            endTime: String
          }
        ]
      }
    ],
    
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

// Compound unique index for className, section, and academicYear
classSchema.index({ className: 1, section: 1, academicYear: 1 }, { unique: true });

export default mongoose.model("Class", classSchema);
