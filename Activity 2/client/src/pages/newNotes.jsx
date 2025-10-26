import { useNavigate, useParams } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";
import dayjs from "dayjs";
import { getAllFolders } from "../services/folderService";
import { useEffect, useState } from "react";
import { createNotes } from "../services/notesService";
import Header from "../components/Header";
import { colors } from "../utils/colors";

const NewNote = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [noteColor, setNoteColor] = useState("white");
  const [newNote, setNewNote] = useState({
    folderId: folderId || "",
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

  useEffect(() => {
    if (!newNote.folderId) return;
    if (folders.length === 0) return;

    const findFolder = folders.find(
      (folder) => folder.id === Number(newNote.folderId)
    );
    // console.log(findFolder);
    setNoteColor(colors[findFolder.color]);
  }, [newNote.folderId, folders]);

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
    <div className="h-full flex flex-col gap-4">
      <Header name={"My Notes"} withBack={true} backLink={-1} />

      {/* Main Content */}
      <form
        onSubmit={handleSubmit}
        className=" w-full p-6 max-w-3xl mx-auto flex flex-col gap-4  rounded-md border border-gray-200 shadow-2xs"
        style={{ backgroundColor: noteColor }}
      >
        {/* Select Option */}
        <select
          value={newNote.folderId}
          name="folderId"
          id="folderId"
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-48 focus:outline-none bg-white "
        >
          <option value={""} disabled>
            Select folder
          </option>
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
          className="text-2xl py-1 font-bold w-full focus:outline-none border-b border-stone-600"
          value={newNote.title}
          name="title"
          id="title"
          onChange={handleChange}
          placeholder="Note Title"
        />

        {/* Date & Time */}
        <p className="text-sm">{dayjs().format("MMMM D, YYYY")}</p>

        {/* Content */}
        <textarea
          className="w-full h-80 rounded-md focus:outline-none resize-none"
          placeholder="Write your notes here..."
          value={newNote.content}
          name="content"
          id="content"
          onChange={handleChange}
        />

        <div className="w-full flex justify-end">
          {/* Delete Button */}
          <button className="flex items-center bg-white font-medium hover:bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
            <span>Create</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNote;
