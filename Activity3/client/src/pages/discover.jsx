import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Book,
  Search,
  Heart,
  GraduationCap,
  BookOpen,
  Landmark,
  Coffee,
  PlusCircle,
  UserPlus,
  Library,
} from "lucide-react";

const Discover = ({ setShowSidebar }) => {
  // --- Inner Component: EmptyBookshelf ---
  const EmptyBookshelf = () => {
    const [open, setOpen] = useState(false);

    const options = [
      {
        id: 1,
        label: "Add Book",
        icon: <Book className="w-4 h-4 text-black" />,
      },
      {
        id: 2,
        label: "Add Author",
        icon: <UserPlus className="w-4 h-4 text-black" />,
      },
      {
        id: 3,
        label: "Add Category",
        icon: <Library className="w-4 h-4 text-black" />,
      },
    ];

    return (
      <div className="flex flex-col min-h-screen p-6">
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
                className="w-1/2 justify-self-center flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-[#000000] text-white"
              >
                <span className="">Add New</span>
                <PlusCircle className="w-5 h-5 text-white justify-self-end" />
              </button>

              {open && (
                <div className="absolute z-10 mt-2 w-full bg-[#C1C1C1] border border-gray-200 rounded-lg shadow-lg">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={() => {
                        setOpen(false);
                        console.log(`${opt.label} selected`);
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
      </div>
    );
  };

  // --- Main Discover Component Logic ---
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Silent Forest",
      author: "Emma Wilde",
      cover:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
    },
    {
      id: 2,
      title: "The Silent Forest",
      author: "Liam Cruz",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Digital Dreams",
      author: "Liam Cruz",
      cover:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
    },
    {
      id: 4,
      title: "The Silent Forest",
      author: "Liam Cruz",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Digital Dreams",
      author: "Liam Cruz",
      cover:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Digital Dreams",
      author: "Liam Cruz",
      cover:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=400&fit=crop",
    },
  ]);

  useEffect(() => {
    const controller = new AbortController();
    getAllBooks(controller);

    return () => controller.abort();
  }, []);

  const getAllBooks = async (controller) => {
    try {
      const response = await fetch("http://localhost:3000/books?limit=6", {
        signal: controller ? controller.signal : null,
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const authors = [
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 4,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 5,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 6,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  const categories = [
    { name: "Fiction", icon: <Book /> },
    { name: "Romance", icon: <Heart /> },
    { name: "Non-Fiction", icon: <BookOpen /> },
    { name: "Education", icon: <GraduationCap /> },
    { name: "Lifestyle", icon: <Coffee /> },
    { name: "Historical", icon: <Landmark /> },
  ];

  // --- Hide Sidebar when empty ---
  useEffect(() => {
    if (setShowSidebar) {
      setShowSidebar(true);
    }
  }, [setShowSidebar]);

  // --- Conditional Render ---
  if (!books || books.length === 0) {
    return <EmptyBookshelf />;
  }

  return (
    <>
      {/* BOOKS */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Recently Added</h1>
        <div className="flex gap-6 flex-wrap justify-center">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex w-45 flex-col bg-white cursor-pointer"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="rounded-md mb-3 h-70 object-cover"
              />
              <h2 className="font-bold text-base">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.author}</p>
            </div>
          ))}
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
          {authors.map((author) => (
            <div
              key={author.id}
              className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-md w-45 cursor-pointer"
            >
              <img
                src={author.image}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">{author.name}</span>
            </div>
          ))}
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
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="flex column items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <div className="text-black">{cat.icon}</div>
              <p className="font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discover;
