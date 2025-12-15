import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import useRole from "../hooks/useRole";

const MemberRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) return <p>Loading...</p>;
  if (!user || role !== "member") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default MemberRoute;
