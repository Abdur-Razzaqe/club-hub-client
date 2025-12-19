import useRole from "../hooks/useRole";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <p>Loading...</p>;
  }
  if (user && role === "admin") {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default AdminRoute;
