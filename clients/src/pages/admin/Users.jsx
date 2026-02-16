import { useEffect, useState, useContext } from "react";
import api from "../../api/axiosInstance";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Users = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "student" });
  const [filterRole, setFilterRole] = useState("all");
  const [editing, setEditing] = useState(null);

  const fetchUsers = () => {
    api.get("/api/users").then((res) => setUsers(res.data || [])).catch(() => setUsers([]));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!user || user.role !== "admin") return <p className="p-6">Unauthorized</p>;

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const startEdit = (u) => setEditing(u);
  const cancelEdit = () => { setEditing(null); setForm({ username: "", email: "", password: "", role: "student" }); };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/api/users/${editing.id}`, form);
        toast.success("User updated");
      } else {
        await api.post("/api/users", form);
        toast.success("User created");
      }
      cancelEdit();
      fetchUsers();
    } catch {
      toast.error("Server error");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await api.delete(`/api/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={user.role} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">{editing ? "Edit User" : "Create User"}</h2>
              <form onSubmit={submit} className="space-y-2">
                <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="input" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" required />
                <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="input" required={!editing} />
                <select name="role" value={form.role} onChange={handleChange} className="input">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <div className="flex gap-2">
                  <button className="bg-green-900 text-white px-4 py-2 rounded">{editing ? "Update" : "Create"}</button>
                  {editing && <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded border">Cancel</button>}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">All Users</h2>
                <div className="flex gap-2">
                  <button onClick={() => setFilterRole("all")} className={`px-3 py-1 rounded ${filterRole==="all"?"bg-green-900 text-white":"border"}`}>All</button>
                  <button onClick={() => setFilterRole("student")} className={`px-3 py-1 rounded ${filterRole==="student"?"bg-green-900 text-white":"border"}`}>Students</button>
                  <button onClick={() => setFilterRole("teacher")} className={`px-3 py-1 rounded ${filterRole==="teacher"?"bg-green-900 text-white":"border"}`}>Teachers</button>
                </div>
              </div>

              <ul className="space-y-2">
                {users.filter(u => filterRole === "all" ? true : u.role === filterRole).map((u) => (
                  <li key={u.id} className="p-3 border rounded flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{u.username || u.email}</div>
                      <div className="text-sm text-gray-500">{u.email} • {u.role}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setForm({ username: u.username || "", email: u.email, password: "", role: u.role }); startEdit(u); }} className="px-3 py-1 rounded bg-yellow-400">Edit</button>
                      <button onClick={() => remove(u.id)} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
