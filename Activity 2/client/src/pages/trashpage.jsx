import React, { useState, useEffect } from "react";
import { Trash2, RotateCcw, Edit3, X, AlertTriangle, CheckCircle } from "lucide-react";

const Trashpage = () => {
  const [trashNotes, setTrashNotes] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // "delete" or "restore"

  // Load notes from localStorage
  useEffect(() => {
    const storedTrash = JSON.parse(localStorage.getItem("trashNotes")) || [];
    setTrashNotes(storedTrash);
  }, []);

  const toggleSelect = (id) => {
    setSelectedNotes((prev) =>
      prev.includes(id)
        ? prev.filter((noteId) => noteId !== id)
        : [...prev, id]
    );
  };

  // --- Edit Mode Toggle ---
  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    setSelectedNotes([]); // clear selections
  };

  // --- Show Popup ---
  const handleActionClick = (type) => {
    if (selectedNotes.length > 0) {
      setPopupType(type);
      setShowPopup(true);
    }
  };

  // --- Confirm Delete ---
  const handleConfirmDelete = () => {
    const remaining = trashNotes.filter(
      (note) => !selectedNotes.includes(note.id)
    );
    localStorage.setItem("trashNotes", JSON.stringify(remaining));
    setTrashNotes(remaining);
    setSelectedNotes([]);
    setShowPopup(false);
    setIsEditMode(false);
  };

  // --- Confirm Restore ---
  const handleConfirmRestore = () => {
    const restored = trashNotes.filter((note) =>
      selectedNotes.includes(note.id)
    );
    const remaining = trashNotes.filter(
      (note) => !selectedNotes.includes(note.id)
    );

    // Move restored notes back to main
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    localStorage.setItem("notes", JSON.stringify([...existingNotes, ...restored]));
    localStorage.setItem("trashNotes", JSON.stringify(remaining));

    setTrashNotes(remaining);
    setSelectedNotes([]);
    setShowPopup(false);
    setIsEditMode(false);
  };

  const colors = ["#EDBBAB", "#AFC8EE", "#F5F76A", "#FFFFFF"];

  return (
    <div className="w-full h-full relative">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Trash</h2>

        {/* Buttons */}
        {!isEditMode ? (
          <button
            onClick={handleEditToggle}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex space-x-4">
            <button
              onClick={() => handleActionClick("restore")}
              className={`flex items-center space-x-1 ${
                selectedNotes.length === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-600 hover:text-green-700"
              }`}
              disabled={selectedNotes.length === 0}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore</span>
            </button>

            <button
              onClick={() => handleActionClick("delete")}
              className={`flex items-center space-x-1 ${
                selectedNotes.length === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-600 hover:text-red-700"
              }`}
              disabled={selectedNotes.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>

            <button
              onClick={handleEditToggle}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Trash Cards */}
      {trashNotes.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No notes in Trash.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trashNotes.map((note, index) => (
            <div
              key={note.id}
              onClick={() => isEditMode && toggleSelect(note.id)}
              className={`relative rounded-lg shadow-md p-5 h-64 flex flex-col hover:shadow-lg transition cursor-pointer ${
                selectedNotes.includes(note.id) ? "ring-4 ring-blue-400" : ""
              }`}
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              {/* Check icon */}
              {isEditMode && selectedNotes.includes(note.id) && (
                <CheckCircle className="absolute top-3 right-3 text-blue-600 w-6 h-6" />
              )}

              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">{note.date}</span>
              </div>

              <h1 className="text-lg font-semibold text-gray-800 underline mb-2">
                {note.title}
              </h1>

              <p className="text-gray-700 text-sm line-clamp-5 overflow-hidden flex-1">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Popup Confirmation */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dim background */}
          <div className="absolute inset-0 backdrop-brightness-50 transition-all duration-300"></div>

          {/* Popup */}
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-96 text-center z-10">
            {popupType === "delete" ? (
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            ) : (
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {popupType === "delete"
                ? `Delete ${selectedNotes.length} ${
                    selectedNotes.length === 1 ? "note" : "notes"
                  } permanently?`
                : `Restore ${selectedNotes.length} ${
                    selectedNotes.length === 1 ? "note" : "notes"
                  }?`}
            </h2>

            <p className="text-gray-600 mb-6">
              {popupType === "delete"
                ? "Once deleted, these notes cannot be recovered."
                : "These notes will be restored to your main notes list."}
            </p>

            <div className="flex justify-center space-x-4">
              {popupType === "delete" ? (
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Delete Permanently
                </button>
              ) : (
                <button
                  onClick={handleConfirmRestore}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Restore Notes
                </button>
              )}

              <button
                onClick={() => setShowPopup(false)}
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

export default Trashpage;
