import Message from "../models/Message.js";

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const { sender, receiver, conversationId } = req.query;
    let query = {};
    
    if (sender) query.sender = sender;
    if (receiver) query.receiver = receiver;
    if (conversationId) query.conversationId = conversationId;
    
    const messages = await Message.find(query)
      .populate("sender", "username email")
      .populate("receiver", "username email")
      .sort({ createdAt: -1 });
      
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get conversation between two users
export const getConversation = async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    })
      .populate("sender", "username email")
      .populate("receiver", "username email")
      .sort({ createdAt: 1 });
      
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get message by ID
export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate("sender", "username email")
      .populate("receiver", "username email");
      
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    await message.populate("sender receiver", "username email");
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update message
export const updateMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete message
export const deleteMessage = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { $push: { deletedBy: userId } },
      { new: true }
    );
    
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get unread message count
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const count = await Message.countDocuments({
      receiver: userId,
      isRead: false,
      deletedBy: { $ne: userId }
    });
    
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user's conversations list
export const getConversationsList = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
          deletedBy: { $ne: userId }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", userId] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                { $and: [{ $eq: ["$receiver", userId] }, { $eq: ["$isRead", false] }] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);
    
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
