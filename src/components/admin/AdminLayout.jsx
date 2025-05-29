import { Menu, X } from "lucide-react"; // Import X for close icon
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for active link styling

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current path for active link

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Investments", path: "/admin/investments" },
    { name: "Transactions", path: "/admin/transactions" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Back to Site", path: "/" },
  ];

  return (
    <>
      <div
        className={`md:flex transition-all duration-300 font-sans text-[#f5f5f5] bg-[#0d1117] min-h-screen`}
      >
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex w-64 bg-[#1f2937] flex-col p-6 border-r border-[#374151] shadow-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-10 border-b border-[#374151] pb-4">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-3 text-lg">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-2 px-3 rounded-lg flex items-center gap-2
                  ${
                    location.pathname === link.path
                      ? "bg-yellow-400 text-[#1f2937] font-semibold"
                      : "hover:bg-[#28374d] text-gray-300 hover:text-yellow-400"
                  } transition-colors duration-200`}
              >
                {/* You can add icons here based on link.name */}
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-h-screen relative">
          {/* Mobile Header (fixed at the top) */}
          <div className="md:hidden fixed w-full top-0 z-40 bg-[#0d1117] py-4 px-4 shadow-lg flex justify-between items-center border-b border-[#374151]">
            <h1 className="text-xl font-bold text-yellow-400">Admin</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-md hover:bg-gray-700 text-yellow-400"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Actual content area, with padding to account for fixed header */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-20 md:pt-6">
            {" "}
            {/* Added pt-20 for mobile */}
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Slideout Menu (Full Overlay) */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:hidden`} // Only show on mobile
      >
        {/* Sidebar part of the slideout */}
        <div className="w-64 bg-[#1f2937] h-full p-6 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-10 border-b border-[#374151] pb-4">
            <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-gray-700 text-yellow-400"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col gap-3 text-lg flex-grow">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // Close menu on link click
                className={`py-2 px-3 rounded-lg flex items-center gap-2
                  ${
                    location.pathname === link.path
                      ? "bg-yellow-400 text-[#1f2937] font-semibold"
                      : "hover:bg-[#28374d] text-gray-300 hover:text-yellow-400"
                  } transition-colors duration-200`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        {/* Overlay to close menu */}
        <div
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-black bg-opacity-70"
        />
      </div>
    </>
  );
};

export default AdminLayout;
