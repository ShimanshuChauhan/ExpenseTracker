import { LayoutDashboard, Wallet, LogOut } from "lucide-react";

import { Sidebar, SidebarItem } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar>
        <SidebarItem icon={LayoutDashboard} text="Dashboard" to="dashboard" />
        <SidebarItem icon={Wallet} text="Expenses" to="expenses" />
        <SidebarItem icon={LogOut} text="Logout" to="logout" />
      </Sidebar>
      <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}