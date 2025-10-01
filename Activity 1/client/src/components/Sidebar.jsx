import { useState } from "react";

import {
  Menu,
  Briefcase,
  Calendar,
  Book,
  Folder,
  FileText,
  PenTool,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const tasks = [
    { name: "Today", path: "/today", icon: <Calendar size={20} /> },
    { name: "Calendar", path: "/calendar", icon: <Book size={20} /> },
  ];

  const lists = [
    { name: "Work", path: "/work", icon: <Briefcase size={20} /> },
    { name: "College", path: "/college", icon: <Book size={20} /> },
    { name: "Project", path: "/project", icon: <Folder size={20} /> },
    { name: "Submission", path: "/submission", icon: <FileText size={20} /> },
    { name: "Exams", path: "/exams", icon: <PenTool size={20} /> },
  ];

  const handleAddNewList = () => {
    alert("Add New List clicked! You can implement this.");
  };

  return (
    <div
      className={`h-screen bg-[#8E7171] text-[#ecf0f1] p-5 box-border fixed top-0 left-0 overflow-y-auto scrollbar-hide transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      {/* Header with Burger */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h2 className="font-bold text-2xl">Menu</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* TASKS Category */}
      <div className="mb-10">
        {!collapsed && (
          <h3 className="text-sm text-[#bdc3c7] mb-3 tracking-[1.5px]">
            TASKS
          </h3>
        )}
        <ul className="list-none p-0">
          {tasks.map((item) => (
            <li key={item.name} className="mb-3">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } no-underline text-lg px-4 py-2 rounded-md transition-colors duration-300 w-full ${
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
                {!collapsed && item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* LISTS Category */}
      <div className="mb-10">
        {!collapsed && (
          <h3 className="text-sm text-[#bdc3c7] mb-3 tracking-[1.5px]">
            LISTS
          </h3>
        )}
        <ul className="list-none p-0">
          {lists.map((item) => (
            <li key={item.name} className="mb-3">
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center" : "gap-3"
                  } no-underline text-lg px-4 py-2 rounded-md transition-colors duration-300 w-full ${
                    isActive
                      ? "bg-[#D9D9D9]/40 text-[#F5F5F5] font-bold"
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
                {!collapsed && item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {!collapsed && (
          <button
            onClick={handleAddNewList}
            className="block mx-auto mt-5 px-4 py-2 bg-transparent rounded-full text-base cursor-pointer transition-colors hover:bg-[#D9D9D9]/40"
          >
            Add New List
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
