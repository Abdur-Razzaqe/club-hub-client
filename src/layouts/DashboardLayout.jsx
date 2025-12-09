import React from "react";
import useAuth from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <aside className="w-64 bg-base-200 p-5 hidden md:block">
        <h2 className="text-xl font-bold mb-5">ClubHub Dashboard</h2>
        {/* role based menu */}
        <ul className="space-y-3">
          <li>
            <NavLink to="/dashboard">Overview</NavLink>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
