import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Common/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
