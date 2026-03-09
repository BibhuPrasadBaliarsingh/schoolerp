import IDCard from "../models/IDCard.js";

// Get all ID cards
export const getAllIDCards = async (req, res) => {
  try {
    const { student, academicYear, status } = req.query;
    let query = {};
    
    if (student) query.student = student;
    if (academicYear) query.academicYear = academicYear;
    if (status) query.status = status;
    
    const idCards = await IDCard.find(query)
      .populate("student", "firstName lastName rollNumber studentId class")
      .populate("issuedBy", "username email");
      
    res.json(idCards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ID card by ID
export const getIDCardById = async (req, res) => {
  try {
    const idCard = await IDCard.findById(req.params.id)
      .populate({
        path: "student",
        populate: { path: "class", select: "className section" }
      })
      .populate("issuedBy", "username email");
      
    if (!idCard) return res.status(404).json({ error: "ID Card not found" });
    res.json(idCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ID card by student
export const getIDCardByStudent = async (req, res) => {
  try {
    const idCard = await IDCard.findOne({ 
      student: req.params.studentId, 
      status: "active" 
    })
      .populate({
        path: "student",
        populate: { path: "class", select: "className section" }
      });
      
    if (!idCard) return res.status(404).json({ error: "ID Card not found" });
    res.json(idCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create ID card
export const createIDCard = async (req, res) => {
  try {
    const idCard = await IDCard.create(req.body);
    res.status(201).json(idCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update ID card
export const updateIDCard = async (req, res) => {
  try {
    const idCard = await IDCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!idCard) return res.status(404).json({ error: "ID Card not found" });
    res.json(idCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete ID card
export const deleteIDCard = async (req, res) => {
  try {
    await IDCard.findByIdAndDelete(req.params.id);
    res.json({ message: "ID Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark ID card as lost/damaged and create replacement
export const replaceIDCard = async (req, res) => {
  try {
    const { reason, newCardData } = req.body;
    
    // Mark old card as replaced
    const oldCard = await IDCard.findByIdAndUpdate(
      req.params.id,
      { status: reason === "lost" ? "lost" : "damaged" },
      { new: true }
    );
    
    // Create new card
    const newCard = await IDCard.create({
      ...newCardData,
      replacementReason: reason
    });
    
    // Link cards
    await IDCard.findByIdAndUpdate(oldCard._id, { replacedBy: newCard._id });
    
    res.json({ oldCard, newCard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
