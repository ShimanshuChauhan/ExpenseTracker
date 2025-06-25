import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";


export default function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<MainLayout />} >
    //     <Route index element={<Dashboard />} />
    //     <Route path="dashboard" element={<Dashboard />} />
    //     <Route path="expenses" element={<Expenses />} />
    //     <Route path="settings" element={<Settings />} />
    //   </Route>
    // </Routes>
    <Signup />
  )
}
