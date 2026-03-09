import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    subject: String,
    message: { type: String, required: true },
    
    // For group conversations
    conversationId: String,
    
    // Message type
    messageType: { type: String, enum: ["text", "file", "image", "audio", "video"], default: "text" },
    
    // Attachments
    attachments: [
      {
        name: String,
        url: String,
        type: String,
        size: Number
      }
    ],
    
    // Read status
    isRead: { type: Boolean, default: false },
    readAt: Date,
    
    // Reply to another message
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    
    // Important flag
    isImportant: { type: Boolean, default: false },
    
    // Deleted status (soft delete)
    deletedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

// Index for efficient message retrieval
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });
messageSchema.index({ conversationId: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);
