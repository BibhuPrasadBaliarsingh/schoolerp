import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "./admin/AdminDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentDashboard from "./student/StudentDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "teacher") return <TeacherDashboard />;
  if (user.role === "student") return <StudentDashboard />;

  return <p>Unauthorized</p>;
};

export default Dashboard;
