// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { auth } = useAuth();

  if (!auth?.isLoggedIn) return <Navigate to="/login" replace />;

  if (allowedRole && auth.role?.toLowerCase() !== allowedRole.toLowerCase()) {
    return <Navigate to={`/${auth.role?.toLowerCase()}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
