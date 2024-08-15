"use client";

import { BarChart3Icon, Compass, Icon, Layout, LayoutDashboard, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Browse",
    href: "/search",
    icon: Compass,
  },
];

const teacherRoutes = [
  {
    label: "Courses",
    href: "/teacher/courses",
    icon: List,
  },
  {
    label: "Analytics",
    href: "/teacher/analytics",
    icon: BarChart3Icon,
  },
];  

export const SidebarRoutes = () => {

  const pathname = usePathname()
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
