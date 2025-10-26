import { useState } from "react";
import { createFolder } from "../services/folderService";
import { folderColors } from "../utils/colors";

function CreateFolder({ setShowModal, getAll }) {
  const [newFolderInfo, setNewFolderInfo] = useState({
    name: "",
    color: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewFolderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4">
        <h2 className="text-xl font-medium">Create New Folder</h2>

        {/* Folder Name Input */}
        <input
          type="text"
          value={newFolderInfo.name}
          name="name"
          id="name"
          onChange={handleChange}
          placeholder="Enter folder name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />

        {/* Folder Color Picker */}
        <label className="block text-sm font-medium text-gray-700">
          Folder Color
        </label>
        <div className="flex gap-2 justify-center">
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
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-700 cursor-pointer text-white">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateFolder;
