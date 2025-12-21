import React, { Profiler } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
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
} from "lucide-react";

const DashboardLayout = () => {
  const [role] = useRole();

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
          {/* <Sidebar /> */}
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
                    ? "/dashboard/admin"
                    : role === "manager"
                    ? "/dashboard/manager"
                    : "/dashboard/member"
                }
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Overview"
              >
                <GrDesktop />
                <span className="is-drawer-close:hidden">Overview</span>
              </NavLink>
            </li>

            {/* admin menu */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="ManageUser"
                    to="admin/manage-users"
                  >
                    <GrUserManager />
                    <span className="is-drawer-close:hidden"> Manage User</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="admin/manage-clubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="ManageClubs"
                  >
                    <UserCheck2Icon />
                    <span className="is-drawer-close:hidden">Manage Clubs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Payment"
                    to="admin/payments"
                  >
                    <CreditCardIcon />
                    <span className="is-drawer-close:hidden">
                      {" "}
                      All Payments
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {/* manager Menu */}
            {role === "manager" && (
              <>
                <li>
                  <NavLink
                    to="manager/create-club"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Create Club"
                  >
                    <PlusCircle />
                    <span className="is-drawer-close:hidden"> Create Club</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/my-clubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    <ClipboardList />
                    <span className="is-drawer-close:hidden"> My Clubs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/club-members"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Club Members"
                  >
                    <User2 />
                    <span className="is-drawer-close:hidden">Club Members</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/my-events"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Events"
                  >
                    <Calendar size={20} />
                    <span className="is-drawer-close:hidden">
                      Manage Events
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/create-event"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Events"
                  >
                    <PlusCircleIcon size={20} />
                    <span className="is-drawer-close:hidden">
                      {" "}
                      Create Events
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="manager/events/:eventId/registrations"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Event Registrations"
                  >
                    <GrUserAdd size={30} />

                    <span className="is-drawer-close:hidden">
                      Event Registrations
                    </span>
                  </NavLink>
                </li>
              </>
            )}
            {/* member menu */}
            {role === "member" && (
              <>
                <li>
                  <NavLink
                    to="member/my-clubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    <GrRestroom />
                    <span className="is-drawer-close:hidden"> My Clubs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="member/my-events"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Events"
                  >
                    <Calendar />
                    <span className="is-drawer-close:hidden"> My Events</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="member/payments"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Events"
                  >
                    <CreditCardIcon />
                    <span className="is-drawer-close:hidden">My Payments</span>
                  </NavLink>
                </li>
              </>
            )}

            <li>
              <Link
                to={"/profile"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <UserCircle />

                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <Settings />

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
