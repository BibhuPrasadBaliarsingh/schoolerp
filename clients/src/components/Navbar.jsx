import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { toggle } = useSidebar();

  return (
    <header className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="md:hidden p-2 rounded bg-green-800/60 hover:bg-green-800/80"
            aria-label="Toggle sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">School ERP</h1>
        </div>

        <div className="space-x-3">
          {!user ? (
            <NavLink
              to="/login"
              className="bg-yellow-400 text-black px-4 py-2 rounded"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
