import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Sidebar from "../components/Sidebar/Sidebar";
import Logo from "../components/Logo/Logo";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <Logo></Logo>
          </div>
        </nav>
        {/* Page content here */}
        <main className="p-4  mx-auto flex-1 items-center">
          <Outlet></Outlet>
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <Sidebar />
          <ul className="menu w-full grow ">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </button>
            </li>

            <li>
              <NavLink
                to={
                  role === "admin"
                    ? "/dashboard"
                    : role === "manager"
                    ? "/dashboard/manager"
                    : "/dashboard/member"
                }
                className={({ isActive }) =>
                  isActive ? "font-bold text-teal-500" : ""
                }
              >
                Overview
              </NavLink>
            </li>

            {/* admin menu */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="manage-users"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    Manage User
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manage-clubs"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    Manage Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="payments"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    All Payments
                  </NavLink>
                </li>
              </>
            )}
            {/* manager Menu */}
            {role === "manager" && (
              <>
                <li>
                  <NavLink
                    to="create-club"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    Create Club
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="my-clubs"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    My Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="my-events"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    Manage Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="create-event"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    Create Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="event-registrations/:eventId"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    Event Registrations
                  </NavLink>
                </li>
              </>
            )}
            {/* member menu */}
            {role === "member" && (
              <>
                <li>
                  <NavLink
                    to="my-clubs"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    My Clubs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="my-events"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    My Events
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="payments"
                    className={({ isActive }) =>
                      isActive ? "font-bold text-teal-500" : ""
                    }
                  >
                    My Payments
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
