import { useEffect, useState, useContext } from "react";
import api from "../../api/axiosInstance";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Students = () => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [adding, setAdding] = useState(false);
  const [teacherForm, setTeacherForm] = useState({ username: "", email: "", password: "" });

  const fetchUsers = () => {
    api
      .get("/api/users")
      .then((res) => setStudents(res.data || []))
      .catch(() => setStudents([]));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTeacherChange = (e) => {
    const { name, value } = e.target;
    setTeacherForm((s) => ({ ...s, [name]: value }));
  };

  const addTeacher = async (e) => {
    e.preventDefault();
    if (!teacherForm.email || !teacherForm.password) return toast.error("Provide email and password");
    setAdding(true);
    try {
      const exists = await api.get(`/api/users?email=${teacherForm.email}`);
      if (exists.data.length > 0) {
        toast.error("User already exists");
        setAdding(false);
        return;
      }

      await api.post("/api/users", {
        username: teacherForm.username || teacherForm.email.split("@")[0],
        email: teacherForm.email,
        password: teacherForm.password,
        role: "teacher",
      });

      toast.success("Teacher added");
      setTeacherForm({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      toast.error("Failed to add teacher");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={user?.role} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Students</h1>

          <div className="bg-white p-4 rounded shadow">
            <p className="mb-4">Total users: {students.length}</p>

            {user?.role === "admin" && (
              <div className="mb-4 border-t pt-4">
                <h3 className="font-semibold mb-2">Add Teacher</h3>
                <form onSubmit={addTeacher} className="space-y-2">
                  <input name="username" value={teacherForm.username} onChange={handleTeacherChange} placeholder="Username (optional)" className="input" />
                  <input name="email" value={teacherForm.email} onChange={handleTeacherChange} placeholder="Email" className="input" required />
                  <input name="password" type="password" value={teacherForm.password} onChange={handleTeacherChange} placeholder="Password" className="input" required />
                  <div>
                    <button disabled={adding} className="bg-green-900 text-white px-4 py-2 rounded">
                      {adding ? "Adding..." : "Add Teacher"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <ul className="space-y-2">
              {(() => {
                const visible = user?.role === "teacher" ? students.filter((s) => s.role === "student") : students;
                return visible.map((u) => (
                  <li key={u.id} className="p-3 bg-white rounded shadow">
                    <div className="font-semibold">{u.username || u.email}</div>
                    <div className="text-sm text-gray-500">{u.role}</div>
                  </li>
                ));
              })()}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Students;
