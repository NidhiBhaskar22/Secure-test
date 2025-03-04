import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  HomeIcon,
  CircleStackIcon,
  PlusIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Logo from "../assets/logo_bgless.png";
import { CiEdit} from "react-icons/ci";
import { useSelector } from "react-redux";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const userRole = auth?.user?.Role;
  console.log(userRole);
  const adminNavigation = [
    { name: "Dashboard", path: "/dashboard-admin", icon: HomeIcon },
    { name: "Tests", path: "/dashboard-admin/test-list", icon: CircleStackIcon },
    { name: "Add Questions", path: "/dashboard-admin/add-ques", icon: CiEdit },
    { name: "Assign Test", path: "/dashboard-admin/assign-test", icon: PlusIcon },
  ];

  const userNavigation = [
    { name: "Dashboard", path: "/dashboard-user", icon: HomeIcon },
    { name: "Tests Assigned", path: "/dashboard-user/tests-list", icon: ClipboardDocumentListIcon },
    { name: "Test History", path: "/dashboard-user/user-history", icon: ClockIcon },
  ];
  
  const navigation = userRole === "ADMIN" ? adminNavigation : userNavigation;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col bg-[#fdfdfd] text-[#030811] border">
        <div className="flex items-center justify-center h-16 border-b border-gray-300 dark:border-gray-700">
          <button onClick={() => navigate('/')} className="h-8 mr-5 pr-5">
            <img src={Logo} alt="Logo" className="h-8 "/>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={() =>
                classNames(
                  location.pathname === item.path
                    ? "bg-orange-500 text-white"
                    : "text-black hover:bg-orange-500 hover:text-white",
                  "flex items-center gap-x-3 px-3 py-2 rounded-md"
                )
              }
            >
              <item.icon className="h-6 w-6" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between h-10  px-4 sm:px-6 lg:px-8  dark:bg-white">
          <button
            className="text-[#030811] lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6 text-[#030811]" />
          </button>
        </header>
        {/* Main Section */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;