import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}
