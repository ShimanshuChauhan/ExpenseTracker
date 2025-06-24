import { LayoutDashboard, Wallet, Settings } from "lucide-react";

import { Sidebar, SidebarItem } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
export function MainLayout() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar>
        <SidebarItem icon={LayoutDashboard} text="Dashboard" to="dashboard" />
        <SidebarItem icon={Wallet} text="Expenses" to="expenses" />
        <SidebarItem icon={Settings} text="Settings" to="settings" />
      </Sidebar>
      <main>
        <Outlet />
      </main>
    </div>
  );
}