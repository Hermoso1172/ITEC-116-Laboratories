import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
