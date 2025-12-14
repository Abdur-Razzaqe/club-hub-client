import React from "react";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const ManagerRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <p>Loading...</p>;
  if (role !== "manager") return <Navigate to="/" />;
  return children;
};

export default ManagerRoute;
