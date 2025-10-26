import { colors } from "../utils/colors";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Edit3, Trash } from "lucide-react";
import { useState } from "react";
import DeletePopUp from "./DeletePopUp";

function Notes({ note, getNotes }) {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <>
      {deleteModal && (
        <DeletePopUp
          getAll={getNotes}
          setDelete={setDeleteModal}
          id={note.id}
        />
      )}
      <div
        key={note.id}
        onClick={() => {
          navigate(`/insideWeb/edit/${note.id}`);
        }}
        className="rounded-lg shadow-md p-4 h-64  hover:-translate-y-1 transition-all duration-200 ease-in-out flex flex-col justify-between cursor-pointer"
        style={{ backgroundColor: colors[note.folders.color] || "#ffffff" }}
      >
        <div>
          {/* date */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm ">
              {dayjs(note.createdAt).format("MM DD, YYYY")}
            </span>
          </div>

          {/* title */}
          <h1 className="text-lg font-semibold">{note.title}</h1>

          <hr className="border-0 border-b border-stone-600" />

          {/* content */}
          <div>
            <p className=" text-sm break-words whitespace-pre-wrap">
              {note.content}
            </p>
          </div>
        </div>

        {/* actions */}
        <div className="self-end flex gap-4">
          <button
            className="cursor-pointer hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation(); // stop the parent onClick
              setDeleteModal(true);
            }}
          >
            <Trash size={16} />
          </button>

          <button
            onClick={() => navigate(`/insideWeb/edit/${note.id}`)}
            className="cursor-pointer hover:text-sky-500"
          >
            <Edit3 size={16} className="cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Notes;
