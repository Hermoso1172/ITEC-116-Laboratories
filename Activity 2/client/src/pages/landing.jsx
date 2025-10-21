import React from 'react';

import {
  FileText,
  Folder,
  PlusCircle,
  Trash2,
  LogOut,
  Trash,
} from 'lucide-react';

const landing = () => {
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col justify-between p-4 border-r">
        {/* Top Section */}
        <div>
          {/* All Notes Button */}
          <button className="flex items-center space-x-2 w-full text-left text-gray-800 hover:text-blue-600 font-medium mb-6">
            <FileText className="w-5 h-5" />
            <span>All Notes</span>
          </button>

          {/* Folders Section */}
          <div>
            <h1 className="flex items-center text-gray-500 font-semibold mb-2 text-sm uppercase tracking-wide">
              <Folder className="w-4 h-4 mr-2" />
              Folders
            </h1>
            <ul className="space-y-2 mb-4">
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">School</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Work</li>
              <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Exam</li>
              <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add new Folder
              </li>
            </ul>
          </div>

          {/* Trash Button */}
          <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
            <Trash className="w-5 h-5" />
            <span>Trash</span>
          </button>
        </div>

        {/* Log out button */}
        <button className="flex items-center space-x-2 text-red-600 hover:text-red-800 font-semibold">
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#E8EAED] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Notes</h1>
          <h1 className="text-lg text-gray-600">Hello, Nica</h1>
        </div>

        {/* Top bar of notes section */}
        <div className="flex justify-between items-center bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800">All Notes</h2>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button className="text-gray-600 hover:text-blue-600">Select All</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default landing;