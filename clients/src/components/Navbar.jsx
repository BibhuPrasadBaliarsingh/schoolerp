import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSidebar } from "../context/SidebarContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { toggle } = useSidebar();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === "/" || location.pathname === "/landing";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-xl text-gray-900" 
          : isLandingPage 
            ? "bg-gradient-to-r from-blue-900/80 via-indigo-900/80 to-purple-900/80 backdrop-blur-md text-white" 
            : "bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={toggle}
              className={`md:hidden p-2 rounded-lg transition-all ${
                scrolled 
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-900" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 ${
              scrolled 
                ? "bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg" 
                : "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl"
            }`}>
              🎓
            </div>
            <div>
              <h1 className={`text-2xl font-extrabold tracking-tight ${
                scrolled ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600" : ""
              }`}>
                School ERP
              </h1>
              <p className={`text-xs font-medium ${scrolled ? "text-gray-600" : "text-gray-300"}`}>
                Smart Education Platform
              </p>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation - Only on Landing Page */}
        {isLandingPage && !user && (
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("features")}
              className={`font-semibold transition-all hover:scale-105 ${
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-yellow-400"
              }`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("bus-tracking")}
              className={`font-semibold transition-all hover:scale-105 ${
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-yellow-400"
              }`}
            >
              Bus Tracking
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className={`font-semibold transition-all hover:scale-105 ${
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-yellow-400"
              }`}
            >
              Contact
            </button>
          </nav>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {!user ? (
            <NavLink
              to="/login"
              className={`font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 ${
                scrolled 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                  : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
              }`}
            >
              Login →
            </NavLink>
          ) : (
            <div className="flex items-center gap-3">
              <div className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-xl ${
                scrolled ? "bg-gray-100" : "bg-white/10 backdrop-blur-sm"
              }`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${scrolled ? "text-gray-900" : "text-white"}`}>
                    {user.name}
                  </p>
                  <p className={`text-xs ${scrolled ? "text-gray-600" : "text-gray-300"}`}>
                    {user.role}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {isLandingPage && !user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all ${
                scrolled 
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-900" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isLandingPage && !user && mobileMenuOpen && (
        <div className={`md:hidden border-t ${
          scrolled ? "bg-white border-gray-200" : "bg-blue-900/95 backdrop-blur-lg border-white/10"
        }`}>
          <nav className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            <button 
              onClick={() => scrollToSection("features")}
              className={`block w-full text-left font-semibold py-3 px-4 rounded-xl transition-all ${
                scrolled 
                  ? "hover:bg-blue-50 text-gray-700" 
                  : "hover:bg-white/10 text-white"
              }`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("bus-tracking")}
              className={`block w-full text-left font-semibold py-3 px-4 rounded-xl transition-all ${
                scrolled 
                  ? "hover:bg-blue-50 text-gray-700" 
                  : "hover:bg-white/10 text-white"
              }`}
            >
              Bus Tracking
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className={`block w-full text-left font-semibold py-3 px-4 rounded-xl transition-all ${
                scrolled 
                  ? "hover:bg-blue-50 text-gray-700" 
                  : "hover:bg-white/10 text-white"
              }`}
            >
              Contact
            </button>
            <div className="pt-2">
              <NavLink
                to="/login"
                className="block w-full text-center font-bold py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black shadow-lg transition-all"
              >
                Login →
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
