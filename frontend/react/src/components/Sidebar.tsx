import type React from "react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  children: React.ReactNode
};

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="h-screen w-80 border-r border-gray-300 shadow-md">
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
            <p className="text-lg font-semibold">John Doe</p>
            <p>johndoe@gmail.com</p>
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
      <NavLink to={to} className={`flex gap-2 p-4 hover:bg-blue-200 hover:text-blue-600 cursor-pointer rounded-md transition-colors duration-200 ease-in-out`}>
        <Icon size={30} />
        <span className="text-lg font-medium">{text}</span>
      </NavLink>
    </li>
  );
}