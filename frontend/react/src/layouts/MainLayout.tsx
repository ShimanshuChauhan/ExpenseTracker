import { LayoutDashboard, Wallet, Settings } from "lucide-react";

import { Sidebar, SidebarItem } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar>
        <SidebarItem icon={LayoutDashboard} text="Dashboard" to="dashboard" />
        <SidebarItem icon={Wallet} text="Expenses" to="expenses" />
        <SidebarItem icon={Settings} text="Settings" to="settings" />
      </Sidebar>
      <main className="flex-1 p-2 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}