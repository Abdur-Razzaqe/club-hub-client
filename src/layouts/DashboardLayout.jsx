import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../contexts/ThemeContext/ThemeContext";
import {
  GrDesktop,
  GrRestroom,
  GrUserAdd,
  GrUserManager,
} from "react-icons/gr";

import Logo from "../components/Logo/Logo";
import {
  Calendar,
  ClipboardList,
  CreditCardIcon,
  PlusCircle,
  PlusCircleIcon,
  Settings,
  User2,
  UserCheck2Icon,
  UserCircle,
  LogOut,
} from "lucide-react";

const DashboardLayout = () => {
  const [role] = useRole();
  const { isDark } = useTheme();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const overviewPath =
    role === "admin"
      ? "/dashboard/admin"
      : role === "manager"
        ? "/dashboard/manager"
        : "/dashboard/member";

  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };

  // ClubHub Brand Colors
  const layoutBg = isDark
    ? "bg-[#05010d] text-gray-100"
    : "bg-gray-50 text-gray-900";
  const sidebarBg = isDark
    ? "bg-[#0b0514] border-white/5"
    : "bg-white border-gray-200";
  const navBg = isDark
    ? "bg-[#0b0514]/80 border-b border-white/5"
    : "bg-white/80 border-b border-gray-100";

  const activeClass = isDark
    ? "bg-pink-600 text-white shadow-lg shadow-pink-500/20"
    : "bg-teal-600 text-white shadow-lg shadow-teal-500/20";

  const hoverClass = isDark ? "hover:bg-white/10" : "hover:bg-black/5";

  return (
    <div
      className={`drawer lg:drawer-open transition-colors duration-500 ${layoutBg}`}
    >
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        {/* --- Navbar --- */}
        <nav
          className={`navbar w-full sticky top-0 z-20 backdrop-blur-md px-6 ${navBg}`}
        >
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              className={`btn btn-square btn-ghost ${isDark ? "text-white" : "text-gray-900"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          {/* <div className="flex-1 px-2">
            <Logo />
          </div> */}
        </nav>

        {/* --- Main Content Area --- */}
        <main className="p-4 md:p-8 flex-1">
          <div
            className={`min-h-[85vh] rounded-[24px] p-6 transition-all border ${
              isDark
                ? "bg-[#0f071a] border-white/5"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- Sidebar --- */}
      <div className="drawer-side z-30">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div
          className={`flex min-h-full flex-col w-64 p-4 transition-colors duration-500 border-r ${sidebarBg}`}
        >
          <div className="hidden lg:flex px-4 py-6 mb-4">
            <Logo />
          </div>

          <ul
            className={`menu w-full grow space-y-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            <li>
              <NavLink
                to={overviewPath}
                end
                className={({ isActive }) =>
                  `flex gap-3 items-center p-3 rounded-xl font-semibold transition-all ${isActive ? activeClass : hoverClass}`
                }
              >
                <GrDesktop size={18} /> Overview
              </NavLink>
            </li>

            <div
              className={`my-4 border-t ${isDark ? "border-white/5" : "border-black/5"}`}
            />

            {/* --- Admin Role --- */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="admin/manage-users"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <GrUserManager size={18} /> Manage User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin/manage-clubs"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <UserCheck2Icon size={18} /> Manage Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin/payments"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <CreditCardIcon size={18} /> All Payments
                  </NavLink>
                </li>
              </>
            )}

            {/* --- Manager Role --- */}
            {role === "manager" && (
              <>
                <li>
                  <NavLink
                    to="manager/create-club"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <PlusCircle size={18} /> Create Club
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/my-clubs"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <ClipboardList size={18} /> My Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/club-members"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <User2 size={18} /> Club Members
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/my-events"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <Calendar size={18} /> Manage Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/create-event"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <PlusCircleIcon size={18} /> Create Events
                  </NavLink>
                </li>
              </>
            )}

            {/* --- Member Role --- */}
            {role === "member" && (
              <>
                <li>
                  <NavLink
                    to="member/my-clubs"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <GrRestroom size={18} /> My Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="member/my-events"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <Calendar size={18} /> My Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="member/payments"
                    className={({ isActive }) =>
                      `flex gap-3 items-center p-3 rounded-xl font-semibold ${isActive ? activeClass : hoverClass}`
                    }
                  >
                    <CreditCardIcon size={18} /> My Payments
                  </NavLink>
                </li>
              </>
            )}

            <div
              className={`my-4 border-t ${isDark ? "border-white/5" : "border-black/5"}`}
            />

            {/* --- Profile Link Section --- */}
            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex gap-3 items-center p-3 rounded-xl font-semibold transition-all cursor-pointer ${
                    isActive ? activeClass : hoverClass
                  }`
                }
              >
                <UserCircle size={18} />
                Profile
              </NavLink>
            </li>

            <li>
              <button
                className={`flex gap-3 items-center p-3 rounded-xl font-semibold cursor-pointer ${hoverClass}`}
              >
                <Settings size={18} /> Settings
              </button>
            </li>
          </ul>

          {/* --- Logout Button --- */}
          <div className="mt-auto pt-4 border-t border-white/5">
            <button
              onClick={handleLogOut}
              className={`flex w-full gap-3 items-center p-3 rounded-xl font-bold transition-all text-red-500 cursor-pointer ${isDark ? "hover:bg-red-500/10" : "hover:bg-red-50"}`}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
