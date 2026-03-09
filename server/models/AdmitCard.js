import mongoose from "mongoose";

const admitCardSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    
    cardNumber: { type: String, unique: true, required: true },
    rollNumber: { type: String, required: true },
    
    academicYear: { type: String, required: true },
    term: String,
    
    // Exam subjects and schedule
    examSchedule: [
      {
        subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
        examDate: Date,
        startTime: String,
        endTime: String,
        room: String
      }
    ],
    
    // Center details
    examCenter: {
      name: String,
      address: String,
      room: String
    },
    
    // Instructions
    instructions: [String],
    
    // Important dates
    reportingTime: String,
    
    // Photo and signature
    photo: String,
    signature: String,
    
    // Barcode/QR code for verification
    qrCode: String,
    barcode: String,
    
    // Issue details
    issueDate: { type: Date, default: Date.now },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Status
    status: { type: String, enum: ["issued", "cancelled", "reissued"], default: "issued" },
    
    // Verification
    isVerified: { type: Boolean, default: false },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    verificationDate: Date,
    
    remarks: String
  },
  { timestamps: true }
);

// Compound index for student and exam
admitCardSchema.index({ student: 1, exam: 1 }, { unique: true });

export default mongoose.model("AdmitCard", admitCardSchema);
