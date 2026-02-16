import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const cardCls =
    "card hover:scale-105 transition-transform duration-150 cursor-pointer flex flex-col items-center justify-center";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role="admin" />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <NavLink to="/dashboard/students" className={cardCls}>
              <div className="text-3xl font-bold text-green-900 mb-2">—</div>
              Total Students
            </NavLink>

            <NavLink to="/dashboard/teachers" className={cardCls}>
              <div className="text-3xl font-bold text-green-900 mb-2">—</div>
              Total Teachers
            </NavLink>

            <NavLink to="/dashboard/fees" className={cardCls}>
              <div className="text-3xl font-bold text-green-900 mb-2">—</div>
              Fee Collection
            </NavLink>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
