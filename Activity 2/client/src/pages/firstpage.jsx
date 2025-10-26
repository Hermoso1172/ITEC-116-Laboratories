import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllNotes } from "../services/notesService";
import Header from "../components/Header";
import Notes from "../components/Notes";

const Firstpage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    getNotes(controller);

    return () => {
      controller.abort();
    };
  }, []);

  const getNotes = async (controller) => {
    const response = await getAllNotes(controller);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setNotes(data);
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col gap-4">
      <Header name={"All Notes"} />

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Add New Note Card */}
        <div
          onClick={() => navigate("newnote")}
          className="border-2 border-dashed border-gray-400 rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600"
        >
          <PlusCircle className="w-14 h-14 text-gray-500 mb-3" />
          <span className="text-gray-600 text-lg font-medium">
            Add New Note
          </span>
        </div>
        {/* Notes */}
        {notes.map((note, index) => (
          <Notes note={note} key={index} getNotes={getNotes} />
        ))}
      </div>
    </div>
  );
};

export default Firstpage;
