import React, { useState } from "react";
import {
  PlusCircle,
  Trash2,
  Edit3,
  Folder as FolderIcon,
} from "lucide-react";

const Folderpage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRenameMode, setIsRenameMode] = useState(false); 
  const [folders, setFolders] = useState([
    { id: 1, name: "Work Notes", color: "#FFD700" },
    { id: 2, name: "Personal", color: "#87CEEB" },
    { id: 3, name: "School Projects", color: "#90EE90" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FFD700");

  // For rename popup
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [renameFolderId, setRenameFolderId] = useState(null);
  const [renameInput, setRenameInput] = useState("");

  const folderColors = [
    "#FF4848",
    "#E69819",
    "#F3EC1B",
    "#26E933",
    "#2DC1E3",
    "#2D41C5",
    "#DE27C6",
  ];

  const handleSave = () => {
    if (!folderName.trim()) return;

    const newFolder = {
      id: Date.now(),
      name: folderName.trim(),
      color: selectedColor,
    };

    setFolders([...folders, newFolder]);
    setFolderName("");
    setSelectedColor("#FFD700");
    setShowModal(false);
  };

  const handleRenameClick = () => {
    setIsRenameMode(true);
    setIsEditMode(false);
  };

  const handleFolderClick = (folder) => {
    if (isRenameMode) {
      setRenameFolderId(folder.id);
      setRenameInput(folder.name);
      setShowRenamePopup(true);
    }
  };

  const confirmRename = () => {
    if (!renameInput.trim()) return;
    setFolders(
      folders.map((folder) =>
        folder.id === renameFolderId
          ? { ...folder, name: renameInput.trim() }
          : folder
      )
    );
    setShowRenamePopup(false);
    setRenameFolderId(null);
    setRenameInput("");
    setIsRenameMode(false);
  };

  return (
    <div className="w-full h-full relative">
      {/* Top bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Folders</h2>

        {!isEditMode && !isRenameMode ? (
          <button
            onClick={() => setIsEditMode(true)}
            className="text-gray-600 hover:text-blue-600"
          >
            Edit
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRenameClick}
              className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
            >
              <Edit3 className="w-4 h-4" />
              <span>Rename</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button className="text-gray-600 hover:text-blue-600">
              Select All
            </button>
            <button
              onClick={() => {
                setIsEditMode(false);
                setIsRenameMode(false);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Folder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleFolderClick(folder)}
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow hover:shadow-lg transition-all cursor-pointer p-8"
          >
            <FolderIcon
              className="w-16 h-16 mb-4"
              style={{ color: folder.color }}
            />
            <h3 className="text-gray-800 font-medium text-lg">{folder.name}</h3>
          </div>
        ))}

        {/* Add Folder Card */}
        <div
          onClick={() => setShowModal(true)}
          className="border-2 border-dashed border-gray-400 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-transparent"
        >
          <PlusCircle className="w-12 h-12 text-gray-500 mb-3" />
          <span className="text-gray-600 text-lg font-medium">Add Folder</span>
        </div>
      </div>

      {/* Add Folder Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>

            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Folder Color
            </label>
            <div className="flex space-x-3 mb-6 justify-center">
              {folderColors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 transition ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>

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

      {/* Rename Popup */}
      {showRenamePopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Rename Folder</h2>

            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
              placeholder="Enter new folder name"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRenamePopup(false);
                  setRenameFolderId(null);
                  setIsRenameMode(false);
                }}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmRename}
                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
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

export default Folderpage;