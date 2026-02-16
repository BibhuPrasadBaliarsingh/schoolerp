import { NavLink } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = ({ role }) => {
  const { open, close } = useSidebar();

  const linkCls = ({ isActive }) =>
    `block mb-3 px-3 py-2 rounded ${isActive ? "bg-yellow-400 text-black" : "hover:bg-yellow-500/20"}`;

  const renderLinks = (links) => (
    <nav>
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} className={linkCls} onClick={close}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 bg-green-900 text-white p-6 hidden md:block h-[93vh]">
        <h2 className="text-xl font-bold mb-6">School ERP</h2>
        {role === "admin" && renderLinks([
          { to: "/dashboard/users", label: "Manage Users" },
          { to: "/dashboard/students", label: "Students" },
          { to: "/dashboard/teachers", label: "Teachers" },
          { to: "/dashboard/fees", label: "Fees" },
          { to: "/dashboard/bus-tracking", label: "🚌 Bus Tracking" },
        ])}

        {role === "teacher" && renderLinks([
          { to: "/dashboard/classes", label: "Classes" },
          { to: "/dashboard/assignments", label: "Assignments" },
          { to: "/dashboard/students", label: "Students" },
          { to: "/dashboard/bus-tracking", label: "🚌 Bus Tracking" },
        ])}

        {role === "student" && renderLinks([
          { to: "/dashboard/courses", label: "My Courses" },
          { to: "/dashboard/homework", label: "Homework" },
          { to: "/dashboard/bus-tracking", label: "🚌 Bus Tracking" },
        ])}
      </aside>

      {/* Mobile overlay + sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={close}>
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-green-900 text-white p-6 transform transition-transform md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">School ERP</h2>
          <button onClick={close} className="p-1 rounded bg-green-800/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {role === "admin" && renderLinks([
          { to: "/dashboard/users", label: "Manage Users" },
          { to: "/dashboard/students", label: "Students" },
          { to: "/dashboard/teachers", label: "Teachers" },
          { to: "/dashboard/fees", label: "Fees" },
          { to: "/dashboard/bus-tracking", label: "🚌 Bus Tracking" },
        ])}

        {role === "teacher" && renderLinks([
          { to: "/dashboard/classes", label: "Classes" },
          { to: "/dashboard/assignments", label: "Assignments" },
          { to: "/dashboard/students", label: "Students" },
          { to: "/dashboard/bus-tracking", label: "🚌 Bus Tracking" },
        ])}

        {role === "student" && renderLinks([
          { to: "/dashboard/courses", label: "My Courses" },
          { to: "/dashboard/homework", label: "Homework" },
          { to: "/dashboard/bus-tracking", label: "🚌 Bus Tracking" },
        ])}
      </aside>
    </>
  );
};

export default Sidebar;
