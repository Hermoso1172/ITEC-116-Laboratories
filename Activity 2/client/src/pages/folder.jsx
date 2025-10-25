import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  CheckCircle,
  Edit3,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllNotes } from "../services/notesService";
import dayjs from "dayjs";
import { colors } from "../utils/colors";

const Folder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    getNotes(controller);

    return () => {
      controller.abort();
    };
  }, [id]);

  const getNotes = async (controller) => {
    const response = await getAllNotes(controller, id);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setNotes(data);
    }
  };

  const [notes, setNotes] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const toggleNoteSelection = (id) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter((noteId) => noteId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };
  const handleDelete = () => {
    if (selectedNotes.length > 0) {
      setShowDeletePopup(true);
    }
  };

  const confirmDelete = () => {
    const remainingNotes = notes.filter(
      (note) => !selectedNotes.includes(note.id)
    );

    const deletedNotes = notes.filter((note) =>
      selectedNotes.includes(note.id)
    );

    const existingTrash = JSON.parse(localStorage.getItem("trashNotes")) || [];

    localStorage.setItem(
      "trashNotes",
      JSON.stringify([...existingTrash, ...deletedNotes])
    );

    setNotes(remainingNotes);
    setSelectedNotes([]);
    setShowDeletePopup(false);

    navigate("/trash");
  };

  return (
    <div className="w-full h-full relative">
      {/* Top bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800">All Notes</h2>

        {!isEditMode ? (
          <button
            onClick={() => setIsEditMode(true)}
            className="text-gray-600 hover:text-blue-600"
          >
            Edit
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDelete}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>

            <button
              onClick={() => setSelectedNotes(notes.map((n) => n.id))}
              className="text-gray-600 hover:text-blue-600"
            >
              Select All
            </button>

            <button
              onClick={() => {
                setIsEditMode(false);
                setSelectedNotes([]);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Add New Note Card */}
        <div
          onClick={() => navigate("newnote")}
          className="border-2 border-dashed border-gray-400 rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-transparent"
        >
          <PlusCircle className="w-14 h-14 text-gray-500 mb-3" />
          <span className="text-gray-600 text-lg font-medium">
            Add New Note
          </span>
        </div>
        {/* Notes */}
        {notes.map((note, index) => (
          <div
            key={note.id}
            onClick={() => isEditMode && toggleNoteSelection(note.id)}
            className="relative rounded-lg shadow-md p-5 h-64 flex flex-col hover:shadow-lg transition cursor-pointer"
            style={{ backgroundColor: colors[note.folders.color] || "#ffffff" }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">
                {dayjs(note.createdAt).format("MM DD, YYYY")}
              </span>
              {selectedNotes.includes(note.id) && isEditMode && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>

            <h1 className="text-lg font-semibold text-gray-800 underline mb-2">
              {note.title}
            </h1>

            <p className="text-gray-700 text-sm line-clamp-5 overflow-hidden flex-1">
              {note.content}
            </p>

            {!isEditMode && (
              <div className="absolute bottom-4 right-4">
                <Edit3
                  className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700"
                  onClick={() => navigate(`/insideWeb/edit/${note.id}`)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-brightness-50 transition-all duration-300"></div>

          <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-96 text-center z-10">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Move {selectedNotes.length}{" "}
              {selectedNotes.length === 1 ? "note" : "notes"} to trash?
            </h2>
            <p className="text-gray-600 mb-6">
              This action will move the selected note(s) to your Trash folder.
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Move to Trash
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folder;
