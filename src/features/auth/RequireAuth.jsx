import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { currentToken } from "./authSlice";

const RequireAuth = () => {
  const token = useSelector(currentToken);
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;
