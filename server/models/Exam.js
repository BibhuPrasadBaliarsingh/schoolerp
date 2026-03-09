import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    examName: { type: String, required: true },
    examType: { type: String, enum: ["unit test", "mid-term", "final", "practical", "assignment", "quiz"], required: true },
    
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    
    academicYear: { type: String, required: true },
    term: { type: String, enum: ["1st Term", "2nd Term", "3rd Term", "Annual"], required: true },
    
    examDate: { type: Date, required: true },
    startTime: String,
    endTime: String,
    duration: Number, // in minutes
    
    totalMarks: { type: Number, required: true },
    passingMarks: { type: Number, required: true },
    
    syllabus: String,
    instructions: String,
    
    room: String,
    invigilator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    status: { type: String, enum: ["scheduled", "ongoing", "completed", "cancelled"], default: "scheduled" },
    
    resultPublished: { type: Boolean, default: false },
    resultPublishDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
