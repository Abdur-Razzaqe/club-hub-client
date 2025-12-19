import React from "react";
import useRole from "../../../hooks/useRole";
import { Navigate } from "react-router";
import LoadingSpinner from "../../Common/LoadingSpinner";

const DashboardRole = () => {
  const [role, roleLoading] = useRole();
  if (roleLoading) return <LoadingSpinner />;

  if (role === "admin") return <Navigate to="/dashboard/admin" />;
  if (role === "admin") return <Navigate to="/dashboard/manager" />;
  if (role === "member") return <Navigate to="/dashboard/member" />;

  return <Navigate to="/" />;
};

export default DashboardRole;
