import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotes, updateNotes } from "../services/notesService";
import { getAllFolders } from "../services/folderService";
import dayjs from "dayjs";
import Header from "../components/Header";
import { colors } from "../utils/colors";

const Editpage = () => {
  const { id } = useParams();
  const [folders, setFolders] = useState([]);
  const [noteColor, setNoteColor] = useState("white");
  const [editNoteInfo, setEditNoteInfo] = useState({
    folderId: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    getNote(controller);
    getAll(controller);
    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    if (!editNoteInfo.folderId) return;
    if (folders.length === 0) return;

    const findFolder = folders.find(
      (folder) => folder.id === Number(editNoteInfo.folderId)
    );
    // console.log(findFolder);
    setNoteColor(colors[findFolder.color]);
  }, [editNoteInfo.folderId, folders]);

  const getNote = async (controller = null) => {
    try {
      const response = await getNotes(id, controller);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setEditNoteInfo(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    setEditNoteInfo((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      editNoteInfo.folderId = Number(editNoteInfo.folderId);
      const response = await updateNotes(id, editNoteInfo);
      if (response.status === 200) {
        alert("Updated Notes");
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
          value={editNoteInfo.folderId}
          name="folderId"
          id="folderId"
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-48 focus:outline-none bg-white "
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
          className="text-2xl py-1 font-bold w-full focus:outline-none border-b border-stone-600"
          value={editNoteInfo.title}
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
          value={editNoteInfo.content}
          name="content"
          id="content"
          onChange={handleChange}
        />

        <div className="w-full flex justify-end">
          {/* Delete Button */}
          <button className="flex items-center bg-white font-medium hover:bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
            <span>Update</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editpage;
