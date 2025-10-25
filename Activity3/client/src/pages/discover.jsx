import React from "react";
import {
  Book,
  Compass,
  Layers,
  User,
  Search,
  Heart,
  GraduationCap,
  BookOpen,
  Landmark,
  Coffee,
} from "lucide-react";

const Discover = () => {
  const books = [
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
      title: "The Silent Forest",
      author: "Liam Cruz",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    },
  ];

  const authors = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "John Doe",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 4,
      name: "Jane Smith",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 5,
      name: "John Doe",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
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

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* ===== Left Navigation Bar ===== */}
      <nav className="w-64 bg-white shadow-lg flex flex-col p-6 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Book className="text-blue-600" />
            <h1 className="text-2xl font-bold">BookShelf</h1>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
              <Compass /> Discovery
            </div>
            <div className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
              <Layers /> Categories
            </div>
            <div className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
              <User /> Author
            </div>
          </div>
        </div>

        <div className="mt-10" />
      </nav>

      {/* ===== Main Container ===== */}
      <main className="flex-1 py-6 px-8 overflow-y-auto">
        {/* Search Bar */}
        <div className="flex justify-self-center items-center bg-white p-2 rounded-xl shadow-sm w-full max-w-xl">
          <Search className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search books, authors..."
            className="outline-none w-full"
          />
        </div>

        {/* Recently Added */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Recently Added</h1>
          <div className="flex gap-6 flex-wrap">
            {books.map((book) => (
              <div
                key={book.id}
                className="flex flex-col bg-white p-4 rounded-xl shadow-md w-35"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="rounded-md mb-3 h-30 object-cover"
                />
                <h2 className="font-bold text-base">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Authors */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Authors</h1>
            <button className="text-blue-600 font-medium">See all</button>
          </div>

          <div className="flex gap-6 flex-wrap">
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-md w-45"
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

        {/* Categories */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Categories</h1>
            <button className="text-blue-600 font-medium">See all</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-blue-600">{cat.icon}</div>
                <span className="font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Discover;
