import Link from "next/link";
import { SidebarRoutes } from "./sidebar-route";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6 cursor-pointer flex items-center justify-center">
        <Link href="/" className="text-sky-500 font-extrabold text-xl">
        IntelliLearn
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
