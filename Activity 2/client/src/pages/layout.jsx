import React, { useEffect, useState } from "react";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import { FileText, Folder, PlusCircle, Trash, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { createFolder, getAllFolders } from "../services/folderService";

const Layout = () => {
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [newFolderInfo, setNewFolderInfo] = useState({
    name: "",
    color: "",
  });
  const { logout } = useAuth();

  const folderColors = [
    {
      name: "RED",
      value: "#FF4848",
    },
    {
      name: "ORANGE",
      value: "#E69819",
    },
    {
      name: "YELLOW",
      value: "#F3EC1B",
    },
    {
      name: "GREEN",
      value: "#26E933",
    },
    {
      name: "BLUE",
      value: "#2DC1E3",
    },
    {
      name: "CYAN",
      value: "#2D41C5",
    },
    {
      name: "PINK",
      value: "#DE27C6",
    },
  ];

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewFolderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newFolderInfo.color || !newFolderInfo.name) {
      alert("Please enter a folder name and select a color.");
      return;
    }

    try {
      const response = await createFolder(newFolderInfo);
      if (response.status === 201) {
        alert("Created Folder");
        getAll();
      }
    } catch (error) {
      console.error(error);
    }

    setShowModal(false);
    setFolderName("");
    setSelectedColor("");
  };

  useEffect(() => {
    const controller = new AbortController();
    getAll(controller);
    return () => {
      controller.abort();
    };
  }, []);

  const getAll = async (controller) => {
    try {
      const response = await getAllFolders(controller);
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        setFolders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">All Notes</h1>
          <h1 className="text-lg text-gray-600">
            Hello, {currentUser.username}
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-54  bg-white flex flex-col justify-between p-4 overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-4">
            <Link
              to=""
              className="flex items-center bg-gray-100 px-4 py-2 rounded-xl  gap-2 w-full text-gray-800 hover:text-blue-600 font-medium"
            >
              <FileText size={16} />
              <span>All Notes</span>
            </Link>

            <div className="flex flex-col gap-4">
              <Link to="folder">
                <h1 className="flex items-center bg-gray-100 rounded-md gap-2 font-semibold  px-4 py-2 cursor-pointer hover:text-blue-600">
                  <Folder size={16} />
                  Folders
                </h1>
              </Link>

              <ul className="flex flex-col gap-2 bg-gray-100 rounded-md px-4 py-2">
                {folders.length > 0 &&
                  folders.map((folder) => (
                    <li
                      key={folder.id}
                      className="text-gray-700 hover:text-blue-600 cursor-pointer"
                    >
                      <Link to={`/insideWeb/folder/${folder.id}`}>
                        {folder.name}
                      </Link>
                    </li>
                  ))}
                <li
                  className="flex gap-2 items-center text-gray-700 hover:text-blue-600 cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  <PlusCircle size={16} />
                  <p className="text-sm"> Add new Folder</p>
                </li>
              </ul>
            </div>

            <Link
              to="trash"
              className="flex items-center justify-center cursor-pointer gap-2 text-gray-700 hover:text-blue-600 font-medium"
            >
              <Trash size={16} />
              <span>Trash</span>
            </Link>
          </div>

          <Link to="/">
            <button
              onClick={logout}
              className="flex items-center mx-auto cursor-pointer self-center gap-2 text-red-600 hover:text-red-800 font-semibold"
            >
              <LogOut size={16} />
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
        <form
          onSubmit={handleSave}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">Create New Folder</h2>

            {/* Folder Name Input */}
            <input
              type="text"
              value={newFolderInfo.name}
              name="name"
              id="name"
              onChange={handleChange}
              placeholder="Enter folder name"
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />

            {/* Folder Color Picker */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Folder Color
            </label>
            <div className="flex space-x-3 mb-6 justify-center">
              {folderColors.map((color, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setNewFolderInfo((prev) => ({ ...prev, color: color.name }))
                  }
                  className={`w-8 h-8 rounded-full cursor-pointer border-2 transition ${
                    newFolderInfo.color === color.name
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.value }}
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
        </form>
      )}
    </div>
  );
};

export default Layout;
