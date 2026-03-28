import React from "react";
import useRole from "../../../hooks/useRole";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../Common/LoadingSpinner";

const DashboardHome = () => {
  const [role, roleLoading] = useRole();

  // Console log for debugging
  console.log("Current Dashboard Role:", role);

  // 1. Loading State: Use your premium spinner
  if (roleLoading) {
    return <LoadingSpinner />;
  }

  // 2. Role-based Redirection
  if (role === "admin") {
    return <Navigate to="/dashboard/admin" replace={true} />;
  }

  if (role === "manager") {
    return <Navigate to="/dashboard/manager" replace={true} />;
  }

  if (role === "member") {
    return <Navigate to="/dashboard/member" replace={true} />;
  }

  // 3. Fallback: If no role found, go back home
  return <Navigate to="/" replace={true} />;
};

export default DashboardHome;
