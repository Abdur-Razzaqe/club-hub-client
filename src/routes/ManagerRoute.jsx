import React, { useContext } from "react";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <p>Loading...</p>;
  if (!user || role !== "manager") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ManagerRoute;
