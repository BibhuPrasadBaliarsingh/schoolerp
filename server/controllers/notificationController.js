import Notification from "../models/Notification.js";

// Get all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const { type, priority, status } = req.query;
    let query = {};
    
    if (type) query.type = type;
    if (priority) query.priority = priority;
    if (status) query.status = status;
    
    const notifications = await Notification.find(query)
      .populate("sender", "username email")
      .populate("recipients.users", "username email")
      .sort({ createdAt: -1 });
      
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const notifications = await Notification.find({
      $or: [
        { "recipients.userType": "all" },
        { "recipients.users": userId }
      ],
      status: "sent"
    })
      .populate("sender", "username email")
      .sort({ createdAt: -1 });
      
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get notification by ID
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)
      .populate("sender", "username email")
      .populate("recipients.users", "username email");
      
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create notification
export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update notification
export const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { userId } = req.body;
    
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { $push: { readBy: { user: userId, readAt: new Date() } } },
      { new: true }
    );
    
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get unread notification count
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const count = await Notification.countDocuments({
      $or: [
        { "recipients.userType": "all" },
        { "recipients.users": userId }
      ],
      status: "sent",
      "readBy.user": { $ne: userId }
    });
    
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
