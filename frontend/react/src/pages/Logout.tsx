// src/pages/Logout.tsx
import { useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    toast.success('Logged out succesfully')  // clear token and user info
    navigate("/login");  // redirect to login
  }, [logout, navigate]);

  return null; // or a loader/spinner if you prefer
}
