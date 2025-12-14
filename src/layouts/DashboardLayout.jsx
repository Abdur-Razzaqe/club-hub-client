import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Sidebar from "../components/Sidebar/Sidebar";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      {/* sidebar */}
      <aside className="w-64 bg-base-200 p-5 hidden md:block">
        <li>
          <NavLink to="/dashboard">Overview</NavLink>
        </li>
        <Sidebar />
        {/* role based menu */}
        <ul className="space-y-3">
          {/* admin */}
          {role === "admin" && (
            <>
              <li>
                <NavLink to="manage-users">Manage Users</NavLink>
              </li>
              <li>
                <NavLink to="manage-clubs">Manage Clubs</NavLink>
              </li>
              <li>
                <NavLink to="payments">All Payments</NavLink>
              </li>
            </>
          )}
          {/* manager */}
          {role === "manager" && (
            <>
              <li>
                <NavLink to="create-club">Create Club</NavLink>
              </li>
              <li>
                <NavLink to="my-clubs">My Clubs</NavLink>
              </li>
              <li>
                <NavLink to="events">Manage Events</NavLink>
              </li>
              <li>
                <NavLink to="create-event">Create Event</NavLink>
              </li>
            </>
          )}
          {/* member */}
          {role === "member" && (
            <>
              <li>
                <NavLink to="dashboard/my-clubs">My Clubs</NavLink>
              </li>
              <li>
                <NavLink to="dashboard/my-events">My Events</NavLink>
              </li>
              <li>
                <NavLink to="dashboard/payments">My Payments</NavLink>
              </li>
            </>
          )}
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
