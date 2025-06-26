import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Authpage from "./pages/Authpage";
import Logout from "./pages/Logout";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <>
      <Routes>
        {/* Public Route for Login/Signup */}
        <Route path="/auth" element={<Authpage />} />

        {/* Protected Routes under MainLayout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}
