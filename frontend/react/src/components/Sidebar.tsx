import type React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

type SidebarProps = {
  children: React.ReactNode
};

export function Sidebar({ children }: SidebarProps) {
  const { user }: { user: { name: string; email: string } } = useAuth();
  return (
    <aside className="h-full w-80 border-r border-gray-300 shadow-md">
      <nav className="flex flex-col gap-2 h-full">
        <div className="p-2 flex items-center justify-left gap-2">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Free_logo.svg" alt="" className="w-32" />
          <p className="text-3xl">Expensly</p>
        </div>
        <div >
          <ul className="flex flex-col gap-2 p-2">
            {children}
          </ul>
        </div>
        <hr className="text-gray-300 shadow-lg" />
        <div className="flex flex-1"></div>
        <div className="p-4 flex items-center justify-start gap-4">
          <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce" alt="" className="w-13 h-13 rounded-full object-cover" />
          <div className="flex flex-col justify-center items-start">
            <p className="text-lg font-semibold">{user.name}</p>
            <p>{user.email.length > 19 ? user.email.substring(0, 19) + "..." : user.email}</p>
          </div>
        </div>
      </nav>
    </aside >
  );
}

type SidebarItemProps = {
  icon: React.ElementType,
  text: string
  to: string
}
export function SidebarItem({ icon: Icon, text, to }: SidebarItemProps) {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => `flex items-center gap-2 p-4 rounded-md ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-300 hover:text-blue-600'}`}>
        <Icon size={30} />
        <span className="text-lg font-medium">{text}</span>
      </NavLink>
    </li>
  );
}