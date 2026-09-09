import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";

function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAppSelector(
    (state) => state.auth
  );

  if (initializing) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;