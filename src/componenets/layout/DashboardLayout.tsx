import Sidebar from "./SideBar";
import Topbar from "./TopBar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;