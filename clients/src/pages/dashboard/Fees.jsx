import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";

const Fees = () => {
  const { user } = useContext(AuthContext);
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: "", amount: "", dueDate: "" });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchFees = () => {
    api
      .get("/api/fees")
      .then((res) => setFees(res.data || []))
      .catch(() => setFees([]));
  };

  const fetchStudents = () => {
    api
      .get("/api/users?role=student")
      .then((res) => setStudents(res.data || []))
      .catch(() => setStudents([]));
  };

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const createFee = async (e) => {
    e.preventDefault();
    if (!form.studentId || !form.amount) return toast.error("Select student and amount");
    setLoading(true);
    try {
      const student = students.find((s) => String(s.id) === String(form.studentId));
      await api.post("/api/fees", {
        studentId: String(form.studentId),
        studentName: student?.username || student?.email || "",
        amount: Number(form.amount),
        dueDate: form.dueDate || null,
        status: "pending",
      });
      toast.success("Fee created");
      setForm({ studentId: "", amount: "", dueDate: "" });
      fetchFees();
    } catch {
      toast.error("Failed to create fee");
    } finally {
      setLoading(false);
    }
  };

  const markPaid = async (id) => {
    try {
      await api.patch(`/api/fees/${id}`, { status: "paid" });
      fetchFees();
      toast.success("Marked paid");
    } catch {
      toast.error("Update failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this fee record?")) return;
    try {
      await api.delete(`/api/fees/${id}`);
      fetchFees();
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const visibleFees = fees.filter((f) => (filter === "all" ? true : f.status === filter));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role={user?.role} />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Fee Management</h1>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Create Fee</h2>
              <form onSubmit={createFee} className="space-y-2">
                <select name="studentId" value={form.studentId} onChange={handleChange} className="input">
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.username || s.email}</option>
                  ))}
                </select>
                <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="input" />
                <input name="dueDate" value={form.dueDate} onChange={handleChange} type="date" className="input" />
                <div>
                  <button className="bg-green-900 text-white px-4 py-2 rounded" disabled={loading}>{loading ? "Saving..." : "Create Fee"}</button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">Fees</h2>
                <div className="flex gap-2">
                  <button onClick={() => setFilter("all")} className={`px-3 py-1 rounded ${filter==="all"?"bg-green-900 text-white":"border"}`}>All</button>
                  <button onClick={() => setFilter("pending")} className={`px-3 py-1 rounded ${filter==="pending"?"bg-yellow-400 text-black":"border"}`}>Pending</button>
                  <button onClick={() => setFilter("paid")} className={`px-3 py-1 rounded ${filter==="paid"?"bg-green-900 text-white":"border"}`}>Paid</button>
                </div>
              </div>

              <ul className="space-y-3">
                {visibleFees.map((f) => (
                  <li key={f.id} className="p-3 border rounded flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{f.studentName} — ₹{f.amount}</div>
                      <div className="text-sm text-gray-500">Due: {f.dueDate || "—"} • {f.status}</div>
                    </div>
                    <div className="flex gap-2">
                      {f.status !== "paid" && user?.role === "admin" && (
                        <button onClick={() => markPaid(f.id)} className="px-3 py-1 rounded bg-green-900 text-white">Mark Paid</button>
                      )}
                      {user?.role === "admin" && (
                        <button onClick={() => remove(f.id)} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
                      )}
                    </div>
                  </li>
                ))}
                {visibleFees.length === 0 && <li className="text-gray-500">No fees found.</li>}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Fees;
