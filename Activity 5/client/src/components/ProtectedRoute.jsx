import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // or a spinner
  }

  return currentUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
