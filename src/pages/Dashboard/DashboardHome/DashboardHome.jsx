import React from "react";
import useRole from "../../../hooks/useRole";
import { Navigate } from "react-router";

const DashboardHome = () => {
  const [role, roleLoading] = useRole();
  console.log("dashboard role:", role);
  if (roleLoading) return <p>Loading....</p>;

  if (role === "admin") return <Navigate to="/dashboard/admin" />;
  if (role === "manager") return <Navigate to="/dashboard/manager" />;
  if (role === "member") return <Navigate to="/dashboard/member" />;
  return <Navigate to="/" />;
};

export default DashboardHome;
