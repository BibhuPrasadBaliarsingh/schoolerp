import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { NavLink } from "react-router-dom";

const TeacherDashboard = () => {
  const cardCls =
    "card hover:scale-105 transition-transform duration-150 cursor-pointer flex flex-col items-center justify-center";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role="teacher" />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

          <div className="grid sm:grid-cols-2 gap-6">
            <NavLink to="/dashboard/classes" className={cardCls}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-green-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3" />
              </svg>
              My Classes
            </NavLink>

            <NavLink to="/dashboard/assignments" className={cardCls}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-green-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
              </svg>
              Assignments
            </NavLink>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
