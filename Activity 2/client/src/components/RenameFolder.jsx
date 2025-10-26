import { useState } from "react";
import { updateFolder } from "../services/folderService";

function RenameFolder({ getAll, id, setShowRenamePopup }) {
  const [renameInput, setRenameInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!renameInput) {
      alert("Please enter a folder name and select a color.");
      return;
    }
    try {
      const response = await updateFolder(id, { name: renameInput });
      if (response.status === 200) {
        alert("Updated Folder");
        await getAll();
        setShowRenamePopup(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black/30  flex justify-center items-center z-50"
    >
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
            type="button"
            onClick={() => setShowRenamePopup(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default RenameFolder;
