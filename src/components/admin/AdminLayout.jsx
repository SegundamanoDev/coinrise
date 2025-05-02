import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Investments", path: "/admin/investments" },
    { name: "Deposits", path: "/admin/deposits" },
    { name: "Withdrawals", path: "/admin/withdrawals" },
    { name: "Referrals", path: "/admin/referrals" },
    { name: "Logs", path: "/admin/logs" },
    { name: "Settings", path: "/admin/settings" },
    { name: "Back to Site", path: "/" },
  ];

  return (
    <>
      <div
        className={`md:flex transition-opacity duration-300 font-sans text-[#f5f5f5] ${
          isOpen ? "opacity-60 pointer-events-none" : "opacity-100"
        } bg-[#0d1117]`}
      >
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 bg-[#1f2937] flex-col p-6 border-r border-[#374151]">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-6 text-lg">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-yellow-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Mobile Header */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Admin</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-1 rounded-md font-semibold"
            >
              <Menu />
            </button>
          </div>

          {children}
        </main>
      </div>

      {/* Mobile Slideout Menu */}
      <div
        className={`fixed inset-0 z-50 flex transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-64 bg-[#1f2937] h-full p-6 shadow-lg">
          <h2 className="text-xl font-bold text-yellow-400 mb-6">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-400 text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        <div
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-black bg-opacity-30"
        />
      </div>
    </>
  );
};

export default AdminLayout;
