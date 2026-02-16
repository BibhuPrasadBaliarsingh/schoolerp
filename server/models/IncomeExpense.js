import mongoose from "mongoose";

const incomeExpenseSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["income", "expense"], required: true },
    category: String,
    amount: { type: Number, required: true },
    description: String,
    date: { type: Date, default: Date.now },
    paymentMode: { type: String, enum: ["cash", "cheque", "online"], default: "cash" },
    receiptNumber: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("IncomeExpense", incomeExpenseSchema);
