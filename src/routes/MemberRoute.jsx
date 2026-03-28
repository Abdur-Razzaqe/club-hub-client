import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Common/LoadingSpinner";

const MemberRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (user && role === "member") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default MemberRoute;
