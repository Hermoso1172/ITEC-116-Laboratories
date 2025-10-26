import { AlertTriangle } from "lucide-react";
import { deleteNotes } from "../services/notesService";

function DeletePopUp({ id, setDelete, getAll }) {
  async function handleDelete() {
    try {
      const response = await deleteNotes(id);
      if (response.status === 200) {
        setDelete(false);
        getAll();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="relative bg-white p-8 rounded-2xl  w-96 text-center z-10">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Are you sure you want to delete this?
        </h2>
        <p className="text-gray-600 mb-6">This action can't be reversed.</p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
          >
            Move to Trash
          </button>
          <button
            onClick={() => setDelete(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
