import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FileText, Folder, PlusCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthProvider";
import { getAllFolders } from "../services/folderService";
import { colors } from "../utils/colors";
import CreateFolder from "../components/CreateFolder";

const Layout = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { currentUser, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [folders, setFolders] = useState([]);

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

  return (
    <div className="flex min-h-screen flex-col font-sans text-stone-700">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-medium text-gray-800">Note-ify</h1>
        <h1 className=" text-gray-600">
          Hello, {currentUser.username || "---"}
        </h1>
      </header>

      <div className="flex flex-1 bg-white">
        {/* Sidebar */}
        <aside className="w-54 bg-white flex flex-col justify-between p-4">
          <div className="flex flex-col gap-4">
            <Link
              to=""
              className={`flex items-center  px-4 py-2 rounded-xl  gap-2 w-full ${
                pathname === "/insideWeb" && "bg-gray-100"
              }`}
            >
              <FileText size={16} />
              <span>All Notes</span>
            </Link>

            <div className="flex flex-col gap-4">
              <Link
                to="folder"
                className={`flex items-center  px-4 py-2 rounded-xl  gap-2 w-full  ${
                  pathname === "/insideWeb/folder" && "bg-gray-100"
                }`}
              >
                <Folder size={16} />
                Folders
              </Link>

              <ul className="flex flex-col gap-2 px-4 py-2">
                {folders.length > 0 &&
                  folders.map((folder) => (
                    <li
                      key={folder.id}
                      className="text-gray-700 cursor-pointer"
                    >
                      <Link
                        to={`/insideWeb/folder/${folder.id}`}
                        className={`flex items-center  p-2 rounded-xl  gap-2 w-full text-sm ${
                          pathname === `/insideWeb/folder/${folder.id}` &&
                          "bg-gray-100"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded-full`}
                          style={{ backgroundColor: colors[folder.color] }}
                        ></div>
                        <p>{folder.name}</p>
                      </Link>
                    </li>
                  ))}
              </ul>
              <button
                className="flex gap-2 items-center text-gray-700  cursor-pointer w-full px-4 py-2 bg-red-200 rounded-md hover:bg-red-300"
                onClick={() => setShowModal(true)}
              >
                <PlusCircle size={16} />
                <p className="text-sm"> Add new Folder</p>
              </button>
            </div>
          </div>
          <Link to="/">
            <button
              onClick={logout}
              className="flex items-center mx-auto cursor-pointer self-center gap-2 text-red-600 hover:text-red-800 font-semibold"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-stone-100 rounded-tl-3xl overflow-y-auto p-8">
          <Outlet /> {/* Where pages render */}
        </main>
      </div>

      {/* Add Folder Modal */}
      {showModal && (
        <CreateFolder setShowModal={setShowModal} getAll={getAll} />
      )}
    </div>
  );
};

export default Layout;
