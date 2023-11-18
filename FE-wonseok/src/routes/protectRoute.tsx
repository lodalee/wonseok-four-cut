import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Outlet } from "react-router-dom";
import ErrorFallback from "./errorBoundary";

interface AuthRouteProps {
  user: boolean;
}

const ProtectedRoutes = ({ user }: AuthRouteProps) => {
  return user ? (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Outlet />
    </ErrorBoundary>
  ) : (
    <Navigate to={"/"} />
  );
};
export default ProtectedRoutes;
