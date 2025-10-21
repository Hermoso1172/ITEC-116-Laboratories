import { useNavigate } from "react-router-dom";
import {
  Trash2,
  ArrowLeft,
} from "lucide-react";

const NewNote = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E8EAED] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 hover:text-blue-600 flex items-center space-x-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 ml-4">My Notes</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          {/* Select Option */}
          <select className="border border-gray-300 rounded-md p-2 mb-4 w-48 focus:outline-none">
            <option>General</option>
            <option>School</option>
            <option>Work</option>
            <option>Personal</option>
          </select>

          {/* Title */}
          <input
            type="text"
            className="text-2xl font-bold text-gray-800 w-full mb-2 focus:outline-none border-b-2"
            placeholder="Note Title"
          />

          {/* Date & Time */}
          <p className="text-gray-500 text-sm mb-4">11/7/2002</p>

          {/* Content */}
          <textarea
            className="w-full h-80 p-3 text-gray-700 border border-gray-300 rounded-lg resize-none focus:outline-none"
            placeholder="Write your notes here..."
          ></textarea>

          <div className="w-full mt-2 flex justify-end">
            {/* Delete Button */}
            <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg space-x-2">
              <Trash2 className="w-6 h-6" />
              <span>DELETE</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewNote;