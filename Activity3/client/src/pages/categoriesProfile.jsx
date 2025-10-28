import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import BookComponent from "../components/BookComponent";
import AddBookModal from "../components/AddBookModal";

const CategoriesProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryInfo, setCategoryInfo] = useState();
  const [books, setBooks] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!id) {
      navigate("/categories");
      return;
    }
    const controller = new AbortController();
    getAllBooks(id, controller);
    getCategoryInfo(id, controller);
    return () => controller.abort();
  }, [id]);

  const getCategoryInfo = async (id, controller) => {
    try {
      const response = await fetch(
        `http://localhost:3000/categories/${Number(id)}`,
        {
          signal: controller ? controller.signal : null,
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setCategoryInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBooks = async (id, controller) => {
    try {
      const response = await fetch(
        `http://localhost:3000/books?categoryId=${Number(id)}`,
        {
          signal: controller ? controller.signal : null,
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 1000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <Header
        name={`Books in ${categoryInfo?.name ?? "---"}`}
        buttonName={"Add New Book"}
        action={() => setShowAddModal(id)}
      />

      {/* CATEGORY  */}
      <div className="flex">
        <img
          src={`http://localhost:3000/public/${
            categoryInfo?.picture ?? "gray.jpg"
          }`}
          alt={categoryInfo?.name ?? "---"}
          className="w-20 h-20 min-w-20 min-h-20 rounded-full object-cover mr-3"
        />
        <div className="text-gray-600 mb-8">
          <strong className="text1xl">{categoryInfo?.name ?? "---"}</strong>
          <p>{categoryInfo?.description ?? "---"}</p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        {/* Book List Placeholder */}
        {books.length > 0 &&
          books.map((book) => (
            <BookComponent
              key={book.id}
              book={book}
              getAll={() => getAllBooks(id)}
              showMessage={showMessage}
            />
          ))}
      </div>

      {showAddModal && (
        <AddBookModal
          getAll={() => getAllBooks(id)}
          setShowAddPopup={setShowAddModal}
          showMessage={showMessage}
          categoryId={categoryInfo?.id}
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

export default CategoriesProfile;
