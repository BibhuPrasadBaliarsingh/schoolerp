import mongoose from "mongoose";

const idCardSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    
    cardNumber: { type: String, unique: true, required: true },
    
    academicYear: { type: String, required: true },
    
    // ID Card Details
    validFrom: { type: Date, required: true },
    validTill: { type: Date, required: true },
    
    // QR Code or Barcode
    qrCode: String,
    barcode: String,
    
    // Card status
    status: { type: String, enum: ["active", "expired", "lost", "damaged", "replaced"], default: "active" },
    
    // Issue details
    issueDate: { type: Date, default: Date.now },
    issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    // Replacement info (if card is replaced)
    replacedBy: { type: mongoose.Schema.Types.ObjectId, ref: "IDCard" },
    replacementReason: String,
    
    // Additional info
    bloodGroup: String,
    emergencyContact: String,
    
    // Photo URL for the ID card
    photo: String,
    
    // Card design template
    template: { type: String, default: "default" },
    
    remarks: String
  },
  { timestamps: true }
);

export default mongoose.model("IDCard", idCardSchema);
