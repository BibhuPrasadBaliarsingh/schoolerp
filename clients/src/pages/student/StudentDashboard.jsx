import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { NavLink } from "react-router-dom";

const StudentDashboard = () => {
  const cardCls =
    "card hover:scale-105 transition-transform duration-150 cursor-pointer flex flex-col items-center justify-center";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar role="student" />

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

          <div className="grid sm:grid-cols-2 gap-6">
            <NavLink to="/dashboard/courses" className={cardCls}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-green-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              </svg>
              My Courses
            </NavLink>

            <NavLink to="/dashboard/homework" className={cardCls}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-green-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2-2 4 4" />
              </svg>
              Homework
            </NavLink>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
