import { LayoutDashboard, Settings, Wallet } from "lucide-react";

import { Sidebar, SidebarItem } from "./components/Sidebar";


export default function App() {
  return (
    <div>
      <Sidebar>
        <SidebarItem icon={LayoutDashboard} text="Dashboard" />
        <SidebarItem icon={Wallet} text="Expenses" />
        <SidebarItem icon={Settings} text="Settings" />
      </Sidebar>
    </div>
  )
}
