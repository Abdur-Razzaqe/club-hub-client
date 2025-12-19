import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const ManagerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) return <p>Loading...</p>;
  if (user && role === "manager") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ManagerRoute;
