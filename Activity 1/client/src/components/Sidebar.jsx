import { useEffect, useState } from "react";

import {
  Menu,
  Briefcase,
  Calendar,
  Book,
  Folder,
  FileText,
  PenTool,
  Trash,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CreateCategoryModal from "../components/CreateCategoryModal";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [createCategory, setCreateCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    getAllCategories({ signal: controller.signal });

    return () => controller.abort();
  }, []);

  const getAllCategories = async (parameters) => {
    try {
      const response = await fetch(
        "http://localhost:3000/categories",
        parameters
      );
      if (response.status === 200) {
        const data = await response.json();
        const list = [];
        data.forEach((category) => {
          list.push({ name: category.name, id: category.id });
        });
        setCategories(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        await getAllCategories();
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tasks = [{ name: "Tasks", path: "/", icon: <Calendar size={20} /> }];

  return (
    <>
      <CreateCategoryModal
        isOpen={createCategory}
        setIsOpen={setCreateCategory}
        getAllCategories={getAllCategories}
      />
      <div
        className={`h-screen bg-[#8E7171] text-[#ecf0f1] p-5 border-r-2 border-0 border-stone-600 fixed top-0 left-0 overflow-y-auto scrollbar-hide transition-all duration-300 w-60 `}
      >
        {/* Header with Burger */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-medium text-2xl">Menu</h2>
        </div>

        {/* TASKS Category */}
        <div className="mb-10">
          <h3 className="text-sm text-[#bdc3c7] mb-3 tracking-[1.5px]">
            TASKS
          </h3>
          <ul className="list-none p-0">
            {tasks.map((item) => (
              <li key={item.name} className="mb-3">
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-4 no-underline text-lg px-4 py-2 rounded-md transition-colors duration-300 w-full ${
                      isActive
                        ? "bg-[#D9D9D9]/42 text-[#F5F5F5] font-bold"
                        : "text-[#ecf0f1] hover:bg-[#F5F5F5]/60"
                    }`
                  }
                >
                  <span
                    className={({ isActive }) =>
                      `w-5 h-5 ${isActive ? "text-[#1abc9c]" : "text-white"}`
                    }
                  >
                    {item.icon}
                  </span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* LISTS Category */}
        <div className="mb-10">
          <h3 className="text-sm text-[#bdc3c7] mb-3 tracking-[1.5px]">
            LISTS
          </h3>
          <ul className="list-none p-0">
            {categories.map((category) => (
              <li key={category.name} className="mb-3 group">
                <NavLink
                  to={`/category/${category.id}`}
                  end
                  className={({ isActive }) =>
                    `flex items-center justify-between  no-underline text-lg px-4 py-2 rounded-md transition-colors duration-300 w-full ${
                      isActive
                        ? "bg-[#D9D9D9]/40 text-[#F5F5F5] font-bold"
                        : "text-[#ecf0f1] hover:bg-[#F5F5F5]/60"
                    }`
                  }
                >
                  <p>{category.name}</p>
                  <Trash
                    size={16}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const deleteConfirm = confirm(
                        "Are you sure you want to delete this categories including its tasks?"
                      );
                      if (deleteConfirm) {
                        deleteCategory(category.id);
                      }
                    }}
                    className="hidden group-hover:block hover:text-red-500"
                  />
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setCreateCategory(true)}
            className="block mx-auto mt-5 px-4 py-2 bg-transparent rounded-full text-base cursor-pointer transition-colors hover:bg-[#D9D9D9]/40"
          >
            Add New List
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
