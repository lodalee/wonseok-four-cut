import { Navigate, Outlet } from "react-router-dom";

interface AuthRouteProps {
  user: boolean;
}

const ProtectedRoutes = ({ user }: AuthRouteProps) => {
  return user ? <Outlet /> : <Navigate to={"/"} />;
};
export default ProtectedRoutes;
