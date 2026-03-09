import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    
    type: { type: String, enum: ["announcement", "alert", "reminder", "event", "warning", "info"], required: true },
    priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
    
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    // Recipients
    recipients: {
      userType: { type: String, enum: ["all", "students", "teachers", "parents", "specific"], required: true },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // For specific users
      classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // For class-specific
      students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }] // For student-specific
    },
    
    // Read status
    readBy: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        readAt: { type: Date, default: Date.now }
      }
    ],
    
    // Attachments
    attachments: [
      {
        name: String,
        url: String,
        type: String
      }
    ],
    
    // Schedule notification
    scheduledFor: Date,
    isScheduled: { type: Boolean, default: false },
    
    // Notification channels
    channels: {
      inApp: { type: Boolean, default: true },
      email: { type: Boolean, default: false },
      sms: { type: Boolean, default: false }
    },
    
    status: { type: String, enum: ["draft", "sent", "scheduled"], default: "sent" },
    
    expiresAt: Date
  },
  { timestamps: true }
);

// Index for efficient queries
notificationSchema.index({ "recipients.users": 1, createdAt: -1 });
notificationSchema.index({ status: 1, scheduledFor: 1 });

export default mongoose.model("Notification", notificationSchema);
