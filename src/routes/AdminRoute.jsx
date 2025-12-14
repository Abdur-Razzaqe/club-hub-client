import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <p>Loading...</p>;
  }
  if (!user || role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
