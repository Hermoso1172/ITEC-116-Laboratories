import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FileText, Folder, PlusCircle, Trash, LogOut } from "lucide-react";

const Layout = () => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  const folderColors = ["#FF4848", "#E69819", "#F3EC1B", "#26E933", "#2DC1E3", "#2D41C5", "#DE27C6"];

  const handleSave = () => {
    if (!folderName || !selectedColor) {
      alert("Please enter a folder name and select a color.");
      return;
    }
    console.log("New folder created:", { folderName, selectedColor });
    setShowModal(false);
    setFolderName("");
    setSelectedColor("");
  };

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
              to=""
              className="flex items-center bg-[#E8EAED] p-2 rounded-xl justify-center space-x-2 w-full text-gray-800 hover:text-blue-600 font-medium mb-6"
            >
              <FileText className="w-5 h-5" />
              <span>All Notes</span>
            </Link>

            <div>
              <Link to="folder">
              <h1
                className="flex items-center font-semibold mb-2 text-xl uppercase tracking-wide cursor-pointer hover:text-blue-600"
                
              >
                <Folder className="w-4 h-4 mr-2" />
                Folders
              </h1>
              </Link>

              <ul className="space-y-2 mb-4 ml-7">
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">School</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Work</li>
                <li className="text-gray-700 hover:text-blue-600 cursor-pointer">Exam</li>
                <li className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={() => setShowModal(true)}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  
                  Add new Folder
                </li>
              </ul>
            </div>

            <Link
              to="trash"
              className="flex items-center justify-center cursor-pointer text-xl mt-10 space-x-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <Trash className="w-5 h-5" />
              <span>Trash</span>
            </Link>
          </div>

          <Link to="/">
              <button
              className="flex items-center m-10 cursor-pointer self-center space-x-2 text-red-600 hover:text-red-800 font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span>Log out</span>
            </button>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#E8EAED] overflow-y-auto p-8">
          <Outlet /> {/* Where pages render */}
        </main>
      </div>

      {/* Add Folder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>

            {/* Folder Name Input */}
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {/* Folder Color Picker */}
            <label className="block mb-2 text-sm font-medium text-gray-700">Folder Color</label>
            <div className="flex space-x-3 mb-6 justify-center">
              {folderColors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 transition ${
                    selectedColor === color ? "border-black scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;