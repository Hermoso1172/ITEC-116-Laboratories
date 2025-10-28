import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookComponent from "../components/BookComponent";
import EmptyBookshelf from "../components/EmptyBookshelf";

const Discover = () => {
  // --- Main Discover Component Logic ---
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");

  const showMessage = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  useEffect(() => {
    const controller = new AbortController();
    getAllBooks(controller);
    getAllAuthors(controller);
    getAllCategories(controller);
    return () => controller.abort();
  }, []);

  const getAllBooks = async (controller) => {
    try {
      const response = await fetch("http://localhost:3000/books?limit=6", {
        signal: controller ? controller.signal : null,
      });
      if (response.status === 200) {
        const data = await response.json();
        setBooks(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAuthors = async (controller) => {
    try {
      const response = await fetch("http://localhost:3000/authors?limit=6", {
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

  const getAllCategories = async (controller) => {
    try {
      const response = await fetch("http://localhost:3000/categories?limit=6", {
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

  return authors.length === 0 &&
    categories.length === 0 &&
    books.length === 0 ? (
    <EmptyBookshelf
      getAllAuthors={getAllAuthors}
      getAllBooks={getAllBooks}
      getAllCategories={getAllCategories}
    />
  ) : (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Recently Added</h1>
        <div className="flex gap-6 flex-wrap">
          {books.length > 0 ? (
            books.map((book) => (
              <BookComponent
                book={book}
                showMessage={showMessage}
                getAll={getAllBooks}
              />
            ))
          ) : (
            <p>Aww... your bookshelf is empty!</p>
          )}
        </div>
      </div>

      {/* AUTHOR */}
      <div className="mt-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Authors</h1>
          <Link to="authors" className="text-black font-medium">
            See all
          </Link>
        </div>

        <div className="flex gap-6 flex-wrap">
          {authors.length > 0 ? (
            authors.map((author) => (
              <Link
                to={`/authors/${author.id}`}
                key={author.id}
                className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-md w-45 cursor-pointer"
              >
                <img
                  src={`http://localhost:3000/public/${author.picture}`}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium">{author.name}</span>
              </Link>
            ))
          ) : (
            <p>Oh no! You haven’t added any authors.</p>
          )}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="mt-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link to="categories" className="text-black font-medium">
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.length > 0 ? (
            categories.map((cat, idx) => (
              <Link
                to={`/categories/${cat.id}`}
                key={idx}
                className="flex column items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={`http://localhost:3000/public/${cat.picture}`}
                  alt={cat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-medium">{cat.name}</p>
              </Link>
            ))
          ) : (
            <p>Oops! Your category list is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Discover;
