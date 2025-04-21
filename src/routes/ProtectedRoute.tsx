import { ReactNode } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
