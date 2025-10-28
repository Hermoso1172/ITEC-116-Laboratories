import { Book, Library, PlusCircle, UserPlus } from "lucide-react";
import { useState } from "react";
import AddBookModal from "./AddBookModal";
import CreateAuthorModal from "./CreateAuthorModal";
import NewCategoryModal from "./NewCategoryModal";

function EmptyBookshelf({ getAllBooks, getAllAuthors, getAllCategories }) {
  const [open, setOpen] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const showMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const options = [
    {
      id: 1,
      label: "Add Book",
      icon: <Book className="w-4 h-4 text-black" />,
      action: () => setShowAddBook(true),
    },
    {
      id: 2,
      label: "Add Author",
      icon: <UserPlus className="w-4 h-4 text-black" />,
      action: () => setShowAddAuthor(true),
    },
    {
      id: 3,
      label: "Add Category",
      icon: <Library className="w-4 h-4 text-black" />,
      action: () => setShowAddCategory(true),
    },
  ];

  return (
    <div className="flex flex-col h-full p-6">
      <header className="flex items-center gap-2 mb-8 fixed top-6 left-6">
        <Book className="w-6 h-6" />
        <h1 className="text-3xl font-bold text-gray-800">BookShelf</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1">
        <div className="flex flex-col items-center bg-white rounded-2xl p-10 max-w-md w-full">
          <Book className="w-40 h-40 mb-4 text-black" />
          <p className="font-semibold text-2xl text-gray-800">
            Aww... your bookshelf is empty!
          </p>
          <p className="text-gray-600 mb-6 text-center">
            Add Books, Authors, or Categories to fill your page.
          </p>

          <div className="relative w-full">
            <button
              onClick={() => setOpen(!open)}
              className="w-1/2 justify-self-center flex items-center gap-4 justify-center cursor-pointer hover:bg-black/60 border border-gray-300 rounded-lg px-4 py-2 bg-[#000000] text-white"
            >
              <span className="">Add New</span>
              <PlusCircle className="w-5 h-5 text-white justify-self-end" />
            </button>

            {open && (
              <div className="absolute z-10 mt-2 w-1/2 translate-x-1/2 bg-[#C1C1C1] border border-gray-200 rounded-lg shadow-lg">
                {options.map((opt) => (
                  <button
                    key={opt.id}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                    onClick={() => {
                      opt.action();
                      setOpen(false);
                    }}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      {showAddBook && (
        <AddBookModal
          setShowAddPopup={setShowAddBook}
          getAll={getAllBooks}
          showMessage={showMessage}
        />
      )}
      {showAddCategory && (
        <NewCategoryModal
          setShowAddPopup={setShowAddCategory}
          getAll={getAllCategories}
          showMessage={showMessage}
        />
      )}
      {showAddAuthor && (
        <CreateAuthorModal
          setShowAddPopup={setShowAddAuthor}
          getAll={getAllAuthors}
          showMessage={showMessage}
        />
      )}
    </div>
  );
}

export default EmptyBookshelf;
