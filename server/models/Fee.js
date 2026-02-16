import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    studentName: String,
    amount: { type: Number, required: true },
    dueDate: Date,
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
    paidDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);
