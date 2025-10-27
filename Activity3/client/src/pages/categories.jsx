import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  Heart,
  BookOpen,
  GraduationCap,
  Coffee,
  Landmark,
  Microscope,
  Puzzle,
  Edit3,
  Trash2,
  Plus,
  Layers,
} from "lucide-react";
import EditCategoryModal from "../components/EditCategoryModal";
import NewCategoryModal from "../components/NewCategoryModal";

const Categories = () => {
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

  const [categories] = useState([
    { id: 1, name: "Fiction", icon: "Book" },
    { id: 2, name: "Romance", icon: "Heart" },
    { id: 3, name: "Non-Fiction", icon: "BookOpen" },
    { id: 4, name: "Education", icon: "GraduationCap" },
    { id: 5, name: "Lifestyle", icon: "Coffee" },
    { id: 6, name: "Historical", icon: "Landmark" },
    { id: 7, name: "Science Fiction", icon: "Microscope" },
    { id: 8, name: "Mystery", icon: "Puzzle" },
  ]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleCategoryClick = (category) => {
    navigate("/books", { state: { category } });
  };

  const handleEdit = (category, e) => {
    e.stopPropagation();
    setFormData({
      name: category.name,
      description: "Sample description of category",
    });
    setShowEditPopup(true);
  };

  const handleDelete = (category, e) => {
    e.stopPropagation();
    showMessage(`"${category.name}" category deleted successfully!`);
  };

  const handleSaveEdit = () => {
    setShowEditPopup(false);
    showMessage("Book Category updated successfully!");
  };

  const handleSaveNew = () => {
    setShowAddPopup(false);
    showMessage("Book Category created successfully!");
  };

  const showMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <div className="p-1">
      {categories.length === 0 ? (
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Layers className="w-40 h-40 mb-4 text-black" />
            <h2 className="text-2xl font-semibold text-black">
              Oops! Your category list is empty.
            </h2>
            <p className="text-black mb-6">
              Add a category to start grouping your books.
            </p>
            <button
              onClick={() => setShowAddPopup(true)}
              className="bg-[#000000] text-white px-6 py-2 rounded-xl hover:bg-[#000000]/60 transition"
            >
              <Plus size={18} className="inline-block mr-2" /> Add Category
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          {/* 🔹 Only show Add button & title if categories exist */}
          {categories.length > 0 && (
            <div className="">
              <div className="flex justify-center items-center mb-6 relative">
                <button
                  onClick={() => setShowAddPopup(true)}
                  className="absolute right-0 bg-[#000000] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#000000]/60 transition"
                >
                  <Plus size={18} /> Add Category
                </button>
              </div>
              <h1 className="text-2xl font-bold">Explore Categories</h1>
            </div>
          )}

          {/* Categories Grid */}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className="relative group flex bg-white flex-col items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <div className="text-black">
                    <Icon size={100} />
                  </div>
                  <span className="font-medium">{cat.name}</span>

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

          {/* ==== Popups + Success Messages ==== */}
          {showEditPopup && <EditCategoryModal />}

          {showAddPopup && <NewCategoryModal />}

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

export default Categories;
