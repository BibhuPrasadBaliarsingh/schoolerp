import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }
  next();
};

export const isTeacher = (req, res, next) => {
  if (req.user.role !== "teacher" && req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Teacher or Admin only." });
  }
  next();
};

export const isStudent = (req, res, next) => {
  if (!["student", "teacher", "admin"].includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied." });
  }
  next();
};

export default authMiddleware;
