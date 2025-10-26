import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Trash2,
  Edit3,
  Folder as FolderIcon,
  Trash,
} from "lucide-react";
import { getAllFolders } from "../services/folderService";
import { colors } from "../utils/colors";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import CreateFolder from "../components/CreateFolder";
import DeleteFolder from "../components/DeleteFolderPopup";
import RenameFolder from "../components/RenameFolder";

const Folderpage = () => {
  const [folders, setFolders] = useState([]);

  const [showModal, setShowModal] = useState(false);
  // For rename popup
  const [showRenamePopup, setShowRenamePopup] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
    <div className="w-full h-full relative flex flex-col gap-4">
      <Header name={"Folders"} />

      {/* Folder Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Add Folder Card */}
        <div
          onClick={() => setShowModal(true)}
          className="border-2 border-dashed border-gray-400 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-stone-700 transition bg-transparent"
        >
          <PlusCircle className="w-12 h-12 text-gray-500 mb-3" />
          <span className="text-gray-600 text-lg font-medium">Add Folder</span>
        </div>

        {folders.map((folder) => (
          <div
            key={folder.id}
            className="flex flex-col items-center justify-center bg-white rounded-md shadow hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer  p-4"
          >
            <div className="flex  flex-1 flex-col items-center justify-center">
              <FolderIcon
                className="w-16 h-16 mb-4"
                style={{ color: colors[folder.color] }}
              />
              <h3 className="text-gray-800 font-medium text-lg">
                {folder.name}
              </h3>
            </div>
            {/* actions */}
            <div className="self-end flex gap-4">
              <button
                className="cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation(); // stop the parent onClick
                  setDeleteModal(folder.id);
                }}
              >
                <Trash size={16} />
              </button>

              <button
                onClick={() => setShowRenamePopup(folder.id)}
                className="cursor-pointer hover:text-sky-500"
              >
                <Edit3 size={16} className="cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Folder Modal */}
      {deleteModal && (
        <DeleteFolder
          id={deleteModal}
          setDelete={setDeleteModal}
          getAll={getAll}
        />
      )}

      {/* Add Folder Modal */}
      {showModal && (
        <CreateFolder setShowModal={setShowModal} getAll={getAll} />
      )}

      {/* Rename Popup */}
      {showRenamePopup && (
        <RenameFolder
          id={showRenamePopup}
          setShowRenamePopup={setShowRenamePopup}
          getAll={getAll}
        />
      )}
    </div>
  );
};

export default Folderpage;
