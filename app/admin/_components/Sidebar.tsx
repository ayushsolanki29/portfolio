"use client";
import {
  Home,
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  X,
  Menu,
  ProjectorIcon,
  FolderGit,
  ImageDown,
  Layers,
  Contact,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Projects", icon: FolderGit, path: "/admin/projects" },
    { name: "Images", icon: ImageDown, path: "/admin/images" },
    { name: "Tech Stacks", icon: Layers, path: "/admin/tech-stacks" },
    { name: "contact", icon: Contact, path: "/admin/contact" },
    { name: "settings", icon: Settings, path: "/admin/settings" },
  ];
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex  ">
      <div
        className={cn(
          "flex flex-col max-h-full h-full p-4 bg-gray-900 text-white transition-all duration-300",
          {
            "w-64": isOpen,
            "w-20": !isOpen,
          }
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <span
            className={cn("text-xl font-bold transition-opacity duration-300", {
              "opacity-100": isOpen,
              "opacity-0": !isOpen,
            })}
          >
            Admin
          </span>
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className={cn(
                      "flex items-center space-x-4 p-2 rounded-md transition-all duration-300",
                      {
                        "bg-gray-800 text-blue-400": isActive,
                        "hover:bg-gray-700 hover:text-blue-300": !isActive,
                        "justify-center": !isOpen,
                      }
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    {isOpen && <span>{item.name}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="mt-auto">
          <button
            className={cn(
              "flex items-center space-x-4 p-2 rounded-md transition-all duration-300 hover:bg-gray-700 hover:text-blue-300",
              {
                "justify-center": !isOpen,
              }
            )}
          >
            <LogOut className="w-6 h-6" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
