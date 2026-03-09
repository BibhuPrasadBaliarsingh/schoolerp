import mongoose from "mongoose";

const marksSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    
    marksObtained: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    
    grade: String, // A+, A, B+, B, C, D, F
    percentage: Number,
    
    remarks: String,
    
    isAbsent: { type: Boolean, default: false },
    
    enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isVerified: { type: Boolean, default: false },
    
    academicYear: String,
    term: String
  },
  { timestamps: true }
);

// Calculate grade and percentage before saving
marksSchema.pre("save", function (next) {
  if (!this.isAbsent) {
    this.percentage = ((this.marksObtained / this.totalMarks) * 100).toFixed(2);
    
    // Grade calculation
    if (this.percentage >= 90) this.grade = "A+";
    else if (this.percentage >= 80) this.grade = "A";
    else if (this.percentage >= 70) this.grade = "B+";
    else if (this.percentage >= 60) this.grade = "B";
    else if (this.percentage >= 50) this.grade = "C";
    else if (this.percentage >= 40) this.grade = "D";
    else this.grade = "F";
  }
  next();
});

// Compound index for student, exam, subject
marksSchema.index({ student: 1, exam: 1, subject: 1 }, { unique: true });

export default mongoose.model("Marks", marksSchema);
