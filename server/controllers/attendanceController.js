import Attendance from "../models/Attendance.js";

// Get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const { student, class: classId, date, status, academicYear } = req.query;
    let query = {};
    
    if (student) query.student = student;
    if (classId) query.class = classId;
    if (date) query.date = new Date(date);
    if (status) query.status = status;
    if (academicYear) query.academicYear = academicYear;
    
    const attendance = await Attendance.find(query)
      .populate("student", "firstName lastName rollNumber")
      .populate("class", "className section")
      .populate("subject", "subjectName")
      .populate("markedBy", "username");
      
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get attendance by ID
export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("student", "firstName lastName rollNumber")
      .populate("class", "className section")
      .populate("subject", "subjectName");
      
    if (!attendance) return res.status(404).json({ error: "Attendance not found" });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark attendance
export const markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark bulk attendance
export const markBulkAttendance = async (req, res) => {
  try {
    const { attendanceRecords } = req.body; // Array of attendance records
    const attendance = await Attendance.insertMany(attendanceRecords);
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!attendance) return res.status(404).json({ error: "Attendance not found" });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete attendance
export const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendance deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get attendance statistics for a student
export const getStudentAttendanceStats = async (req, res) => {
  try {
    const { studentId, startDate, endDate } = req.query;
    
    let query = { student: studentId };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    
    const attendance = await Attendance.find(query);
    
    const stats = {
      total: attendance.length,
      present: attendance.filter(a => a.status === "present").length,
      absent: attendance.filter(a => a.status === "absent").length,
      late: attendance.filter(a => a.status === "late").length,
      halfDay: attendance.filter(a => a.status === "half-day").length,
      leave: attendance.filter(a => a.status === "leave").length
    };
    
    stats.percentage = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(2) : 0;
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get class attendance for a specific date
export const getClassAttendanceByDate = async (req, res) => {
  try {
    const { classId, date } = req.query;
    
    const attendance = await Attendance.find({
      class: classId,
      date: new Date(date)
    }).populate("student", "firstName lastName rollNumber");
    
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
