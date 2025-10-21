import React, { useState } from "react";
import {
  PlusCircle,
  CheckCircle,
  Edit3,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const Firstpage = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Meeting Notes",
      date: "Oct 21, 2025",
      content:
        "Discuss project milestones, assign tasks to team members, and set deadlines for deliverables.",
    },
    {
      id: 2,
      title: "Shopping List",
      date: "Oct 20, 2025",
      content:
        "Milk, bread, eggs, butter, cheese, fruits, vegetables, and a new coffee maker.",
    },
    {
      id: 3,
      title: "Exam Schedule",
      date: "Oct 19, 2025",
      content:
        "Math - Monday, Science - Tuesday, History - Wednesday, English - Thursday.",
    },
  ]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Assign each card a unique color
  const colors = ["#EDBBAB", "#AFC8EE", "#F5F76A", "#FFFFFF"];

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

    // Save deleted notes to localStorage for Trashpage
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
        <div className="border-2 border-dashed border-gray-400 rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition bg-transparent">
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
            style={{ backgroundColor: colors[index % colors.length] }}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-600">{note.date}</span>
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
                    onClick={() => navigate(`/edit/${note.id}`)}
                  />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background visible but dimmed */}
          <div className="absolute inset-0 backdrop-brightness-50 transition-all duration-300"></div>

          {/* Popup Card */}
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

export default Firstpage;