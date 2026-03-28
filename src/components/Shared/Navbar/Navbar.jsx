import { Link, NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import {
  Menu,
  Moon,
  Sun,
  LayoutDashboard,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext/ThemeContext";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = async () => {
    try {
      await logOut();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 relative ${
      isActive
        ? "text-teal-400 after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-teal-400"
        : isDark
          ? "text-gray-400 hover:text-white"
          : "text-gray-600 hover:text-black"
    }`;

  return (
    <nav
      className={`sticky top-0 z-[1000] w-full transition-all duration-500 border-b ${
        isDark
          ? "bg-black/40 backdrop-blur-xl border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-white/60 backdrop-blur-md border-gray-200/50 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="dropdown lg:hidden">
              <label
                tabIndex={0}
                className={`btn btn-ghost btn-circle ${isDark ? "text-white" : "text-black"}`}
              >
                <Menu size={24} />
              </label>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow-2xl rounded-3xl w-64 space-y-3 backdrop-blur-2xl ${
                  isDark
                    ? "bg-black/90 border border-white/10 text-white"
                    : "bg-white/90 border border-gray-100"
                }`}
              >
                <li>
                  <NavLink to="/" end className={navLinkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/clubs" className={navLinkClass}>
                    Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events" className={navLinkClass}>
                    Events
                  </NavLink>
                </li>
              </ul>
            </div>
            <Logo />
          </div>

          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-2">
              <li>
                <NavLink to="/" end className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/clubs" className={navLinkClass}>
                  Clubs
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className={navLinkClass}>
                  Events
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl transition-all duration-300 border ${
                isDark
                  ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10"
                  : "bg-gray-100 border-gray-200 text-indigo-600 hover:bg-gray-200 shadow-inner"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {!user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`hidden md:block px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-2xl transition-all ${
                    isDark
                      ? "text-white hover:bg-white/10"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-gradient-to-br from-teal-400 to-blue-600 rounded-2xl hover:scale-[1.05] active:scale-95 transition-all shadow-[0_10px_20px_rgba(20,184,166,0.2)]"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <div ref={dropdownRef} className="relative ml-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="p-[2px] rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 hover:rotate-12 transition-transform duration-500"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/2Fsf1wB/avatar.png"}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-transparent"
                  />
                </button>

                {open && (
                  <div
                    className={`absolute right-0 mt-4 w-64 shadow-2xl rounded-[28px] overflow-hidden z-[100] border backdrop-blur-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-300 ${
                      isDark
                        ? "bg-black/80 border-white/10 text-white"
                        : "bg-white/80 border-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="p-6 border-b border-white/5 bg-teal-500/10">
                      <p className="font-black text-sm truncate uppercase tracking-tight">
                        {user?.displayName}
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate mt-1">
                        {user?.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-teal-500/10 transition-colors cursor-pointer"
                      >
                        <UserIcon size={16} className="text-teal-500" /> Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-2xl hover:bg-teal-500/10 transition-colors cursor-pointer"
                      >
                        <LayoutDashboard size={16} className="text-teal-500" />{" "}
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 rounded-2xl hover:bg-red-500/10 transition-colors mt-1 cursor-pointer"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
