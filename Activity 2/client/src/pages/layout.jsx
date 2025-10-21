import React from "react";

import { Outlet, Link } from "react-router-dom";
import { FileText, Folder, PlusCircle, Trash, LogOut } from "lucide-react";

const Layout = () => {


  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">All Notes</h1>
          <h1 className="text-lg text-gray-600">Hello, Nica</h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-54 bg-white flex flex-col justify-between p-4 overflow-y-auto no-scrollbar">
          <div>
            <Link
              to="/"
              className="flex items-center bg-[#E8EAED] p-2 rounded-xl justify-center space-x-2 w-full text-gray-800 hover:text-blue-600 font-medium mb-6"
            >
              <FileText className="w-5 h-5" />
              <span>All Notes</span>
            </Link>

            <div>
              <h1 className="flex items-center font-semibold mb-2 text-xl uppercase tracking-wide">
                <Folder className="w-4 h-4 mr-2" />
                Folders
              </h1>
              <ul className="space-y-2 mb-4 ml-7">
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">School</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Work</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Exam</li>
                <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add new Folder
                </li>
              </ul>
            </div>

            <Link
              to="/trash"
              className="flex items-center justify-center cursor-pointer text-xl mt-10 space-x-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <Trash className="w-5 h-5" />
              <span>Trash</span>
            </Link>
          </div>

          <button 
        
            className="flex items-center m-10 cursor-pointer self-center space-x-2 text-red-600 hover:text-red-800 font-semibold">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#E8EAED] overflow-y-auto p-8">
          <Outlet /> {/* Where pages render */}
        </main>
      </div>
    </div>
  );
};

export default Layout;