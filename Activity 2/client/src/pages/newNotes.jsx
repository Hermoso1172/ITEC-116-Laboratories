import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import dayjs from "dayjs";
import { getAllFolders } from "../services/folderService";
import { useEffect, useState } from "react";
import { createNotes } from "../services/notesService";

const NewNote = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [newNote, setNewNote] = useState({
    folderId: "",
    title: "",
    content: "",
  });

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

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNewNote((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      newNote.folderId = Number(newNote.folderId);
      const response = await createNotes(newNote);
      if (response.status === 201) {
        alert("Notes Created Successfully");
        navigate("/insideWeb");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className=" bg-[#E8EAED] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="text-gray-700 hover:text-blue-600 flex items-center space-x-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-800 ml-4">
            My Notes
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 w-full p-6 overflow-y-auto"
      >
        <div className={`max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6`}>
          {/* Select Option */}
          <select
            value={newNote.folderId}
            name="folderId"
            id="folderId"
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mb-4 w-48 focus:outline-none"
          >
            {folders.length > 0 &&
              folders.map((folder, index) => {
                return (
                  <option value={folder.id} key={index}>
                    {folder.name}
                  </option>
                );
              })}
          </select>

          {/* Title */}
          <input
            type="text"
            className="text-2xl font-bold text-gray-800 w-full mb-2 focus:outline-none border-b-2"
            value={newNote.title}
            name="title"
            id="title"
            onChange={handleChange}
            placeholder="Note Title"
          />

          {/* Date & Time */}
          <p className="text-gray-500 text-sm mb-4">
            {dayjs().format("MMMM D, YYYY")}
          </p>

          {/* Content */}
          <textarea
            className="w-full p-3 text-gray-700 border border-gray-300 rounded-lg resize-none focus:outline-none"
            placeholder="Write your notes here..."
            rows={10}
            value={newNote.content}
            name="content"
            id="content"
            onChange={handleChange}
          ></textarea>

          <div className="w-full mt-2 flex justify-end">
            {/* Delete Button */}
            <button className="flex items-center bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg cursor-pointer shadow-lg space-x-2">
              <span>Create</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewNote;
