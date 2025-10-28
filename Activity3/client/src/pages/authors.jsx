import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  Search,
  Heart,
  GraduationCap,
  BookOpen,
  Landmark,
  Coffee,
  Microscope,
  Puzzle,
  Edit3,
  Trash2,
  Plus,
  User,
} from "lucide-react";
import CreateAuthorModal from "../components/CreateAuthorModal";
import EditAuthorModal from "../components/EditAuthorModal";

const Authors = () => {
  const navigate = useNavigate();

  const iconMap = {
    Book,
    Heart,
    BookOpen,
    GraduationCap,
    Coffee,
    Landmark,
    Microscope,
    Puzzle,
  };

  const [authors, setAuthors] = useState([
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    // {
    //   id: 2,
    //   name: "Jane Smith",
    //   image:
    //     "https://randomuser.me/api/portraits/women/44.jpg",
    // },
    // {
    //   id: 3,
    //   name: "John Doe",
    //   image:
    //     "https://randomuser.me/api/portraits/men/32.jpg",
    // },
    // {
    //   id: 4,
    //   name: "Jane Smith",
    //   image:
    //     "https://randomuser.me/api/portraits/women/44.jpg",
    // },
    // {
    //   id: 5,
    //   name: "John Doe",
    //   image:
    //     "https://randomuser.me/api/portraits/men/32.jpg",
    // },
  ]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  // Pass both name and Image
  const handleCategoryClick = (category) => {
    navigate("/authorsprofile", { state: { category } });
  };

  const handleEdit = (category, e) => {
    e.stopPropagation();
    setFormData({
      name: category.name,
      description: "Sample description of category",
      image: category.image,
    });
    setShowEditPopup(true);
  };

  const handleDelete = (category, e) => {
    e.stopPropagation();
    showMessage(`"${category.name}" category deleted successfully!`);
  };

  const showMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  useEffect(() => {
    const controller = new AbortController();
    getAll(controller);
    return () => controller.abort();
  }, []);

  const getAll = async (controller) => {
    try {
      const response = await fetch("http://localhost:3000/authors", {
        method: "GET",
        signal: controller ? controller.signal : null,
      });
      if (response.status === 200) {
        const data = await response.json();
        setAuthors(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1">
      {authors.length === 0 ? (
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            <User className="w-40 h-40 mb-4 text-black" />
            <h2 className="text-2xl font-semibold text-black">
              Oh no! You haven’t added any authors.
            </h2>
            <p className="text-black mb-6">
              Add your first author to fill this page.
            </p>
            <button
              onClick={() => setShowAddPopup(true)}
              className="bg-[#000000] text-white px-6 py-2 rounded-xl hover:bg-[#000000]/60 transition"
            >
              <Plus size={18} className="inline-block mr-2" /> Add Author
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="">
            <div className="flex justify-center items-center mb-6 relative">
              <button
                onClick={() => setShowAddPopup(true)}
                className="absolute right-0 bg-[#000000] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#000000]/60 transition"
              >
                <Plus size={18} /> Add Authors
              </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Explore Authors</h1>
          </div>

          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {authors.map((cat) => {
                const Icon = iconMap[cat.icon];
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat)}
                    className="relative group flex bg-[#EEEEEE] flex-col items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                  >
                    <img
                      src={`http://localhost:3000/uploads/${cat.image}`}
                      alt={cat.name}
                      className="w-40 h-40 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-center">
                      <span className="font-bold text-2xl">{cat.name}</span>
                      <span className="">View Books</span>
                    </div>

                    {/* Hover Edit/Delete Icons */}
                    <div
                      className="absolute top-2 right-2 flex gap-2 bg-white p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => handleEdit(cat, e)}
                        className="p-1 hover:text-green-600"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(cat, e)}
                        className="p-1 bg-black rounded-full text-white hover:bg-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==== Popups + Success Messages ==== */}
          {showEditPopup && <EditAuthorModal />}

          {showAddPopup && (
            <CreateAuthorModal
              setShowAddPopup={setShowAddPopup}
              showMessage={showMessage}
            />
          )}

          {successMessage && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-[#323232] text-white px-8 py-4 rounded-lg shadow-lg text-lg font-medium animate-fade">
                {successMessage}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Authors;
