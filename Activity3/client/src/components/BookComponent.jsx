import { Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import EditBookModal from "./EditBookModal";

function BookComponent({ book, getAll, showMessage }) {
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEdit = (id, e) => {
    e.stopPropagation();
    setShowEditPopup(id);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        await getAll();
        showMessage(`"Author deleted successfully!`);
      }
    }
  };

  return (
    <>
      <div
        key={book.id}
        className="relative group  flex w-45 flex-col bg-white cursor-pointer"
      >
        <img
          src={`http://localhost:3000/public/${book.picture}`}
          alt={book.title}
          className="rounded-md mb-3 h-70 object-cover group-hover:shadow-lg"
        />
        <h2 className="font-bold text-base">{book.name}</h2>
        <p className="text-sm text-gray-600">{book.author.name}</p>

        {/* Hover Edit/Delete Icons */}
        <div
          className="absolute top-2 right-2 flex gap-2 bg-white p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => handleEdit(book.id, e)}
            className="p-1 hover:text-green-600"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={(e) => handleDelete(book.id, e)}
            className="p-1 bg-black rounded-full text-white hover:bg-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
        {showEditPopup && (
          <EditBookModal
            id={showEditPopup}
            setShowEditPopup={setShowEditPopup}
            showMessage={showMessage}
            getAll={getAll}
            authorId={book.authorId}
            categoryId={book.categoryId}
          />
        )}
      </div>
    </>
  );
}

export default BookComponent;
