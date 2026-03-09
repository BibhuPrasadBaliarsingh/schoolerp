import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    studentId: { type: String, unique: true, required: true },
    rollNumber: { type: String, required: true },
    admissionNumber: { type: String, unique: true, required: true },
    admissionDate: { type: Date, required: true },
    
    // Personal Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    nationality: { type: String, default: "Indian" },
    religion: String,
    category: { type: String, enum: ["General", "OBC", "SC", "ST", "Other"] },
    photo: String,
    
    // Contact Information
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" }
    },
    
    // Academic Information
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
    section: String,
    academicYear: String,
    previousSchool: String,
    
    // Parent/Guardian Information
    father: {
      name: String,
      occupation: String,
      phone: String,
      email: String,
      income: Number
    },
    mother: {
      name: String,
      occupation: String,
      phone: String,
      email: String,
      income: Number
    },
    guardian: {
      name: String,
      relation: String,
      phone: String,
      email: String,
      address: String
    },
    
    // Emergency Contact
    emergencyContact: {
      name: String,
      relation: String,
      phone: String
    },
    
    // Medical Information
    medicalInfo: {
      allergies: [String],
      bloodGroup: String,
      medications: [String],
      specialNeeds: String
    },
    
    // Transport Information
    busRoute: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
    pickupPoint: String,
    
    // Status
    status: { type: String, enum: ["active", "inactive", "graduated", "transferred"], default: "active" },
    
    // Additional Information
    remarks: String,
    documents: [
      {
        name: String,
        type: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Index for faster queries
studentSchema.index({ studentId: 1, class: 1, section: 1 });

export default mongoose.model("Student", studentSchema);
