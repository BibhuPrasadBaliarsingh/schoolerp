import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    subjectCode: { type: String, unique: true, required: true },
    description: String,
    
    classLevel: { type: String, required: true }, // e.g., "Class 10", "Class 5"
    
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    type: { type: String, enum: ["core", "elective", "optional"], default: "core" },
    
    totalMarks: { type: Number, default: 100 },
    passingMarks: { type: Number, default: 33 },
    
    syllabus: String,
    
    credits: Number,
    
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
);

export default mongoose.model("Subject", subjectSchema);
