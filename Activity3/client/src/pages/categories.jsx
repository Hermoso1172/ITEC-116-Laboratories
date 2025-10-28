import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit3, Trash2, Plus, Layers } from "lucide-react";
import EditCategoryModal from "../components/EditCategoryModal";
import NewCategoryModal from "../components/NewCategoryModal";
import Header from "../components/Header";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCategoryClick = (author) => {
    navigate(`/categories/${author.id}`);
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    setShowEditPopup(id);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const confirmDelete = confirm(
      "Are you sure you want to delete this author?"
    );
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        getAll();
        showMessage(`"Author deleted successfully!`);
      }
    }
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
      const response = await fetch("http://localhost:3000/categories", {
        method: "GET",
        signal: controller ? controller.signal : null,
      });
      if (response.status === 200) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1 h-full">
      {categories.length === 0 ? (
        <div className="flex flex-col h-full items-center justify-center">
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
        <div className="flex flex-col gap-4">
          <Header
            name={"Explore Categories"}
            buttonName={"Add Categories"}
            action={() => setShowAddPopup(true)}
          />
          {/* Categories Grid */}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className="relative group flex bg-[#EEEEEE] flex-col items-center gap-3 p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={`http://localhost:3000/public/${cat.picture}`}
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
                      onClick={(e) => handleEdit(cat.id, e)}
                      className="p-1 hover:text-green-600"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(cat.id, e)}
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
      )}
      {/* ==== Popups + Success Messages ==== */}
      {showEditPopup && (
        <EditCategoryModal
          id={showEditPopup}
          setShowEditPopup={setShowEditPopup}
          showMessage={showMessage}
          getAll={getAll}
        />
      )}

      {showAddPopup && (
        <NewCategoryModal
          setShowAddPopup={setShowAddPopup}
          getAll={getAll}
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
  );
};

export default Categories;
