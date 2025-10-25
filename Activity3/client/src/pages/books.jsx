import React from "react";
import { useLocation } from "react-router-dom";
import {
  Book,
  Heart,
  BookOpen,
  GraduationCap,
  Coffee,
  Landmark,
  Microscope,
  Puzzle,
  Search,
} from "lucide-react";

const Books = () => {
  const location = useLocation();
  const category = location.state?.category;

  // Recreate icon map to render passed icon name
  const iconMap = {
    Book,
    Heart,
    BookOpen,
    GraduationCap,
    Coffee,
    Landmark,
    Microscope,
    Puzzle,
  };

  const Icon = category ? iconMap[category.icon] : null;

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex justify-center items-center mb-6 relative">
        <div className="flex items-center bg-white p-3 rounded-xl shadow-sm w-full max-w-xl">
          <Search className="text-gray-500 mr-3" />
          <input
            type="text"
            placeholder="Search books..."
            className="outline-none w-full"
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        
        <h1 className="text-2xl font-bold">
          Books in {category ? category.name : "Selected Category"}
        </h1>
      </div>

       <div className="flex">
            {Icon && <Icon size={70} className="text-blue-600 p-1 mr-5" />}

            <div className="text-gray-600 mb-8">
                <strong className="text1xl">{category.name}</strong> 
                <p>This category includes books that focus on personal growth, daily living, 
                    health, wellness, fashion, travel, home improvement, and self-care.</p>
            </div>
        </div>

      {/* Book List Placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-md">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400"
            alt="Book cover"
            className="w-24 h-32 object-cover rounded-md mb-2"
          />
          <h2 className="font-bold text-center">Sample Book</h2>
          <p className="text-sm text-gray-600">John Doe</p>
        </div>
      </div>
    </div>
  );
};

export default Books;