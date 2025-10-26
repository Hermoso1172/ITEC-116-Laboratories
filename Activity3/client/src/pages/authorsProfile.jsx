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

const AuthorsProfile = () => {
  const location = useLocation();
  const category = location.state?.category;


  return (
    <div className="p-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        
        <h1 className="text-2xl font-bold">
          Books by {category ? category.name : "Selected Category"}
        </h1>
      </div>

       <div className="flex">
           
              <img
                src={category.image}
                alt={category.name}
                className="w-20 h-20 rounded-full object-cover mr-3"
              />

            <div className="text-gray-600 mb-8">
                <strong className="text1xl">{category.name}</strong> 
                <p>J.K. Rowling is a globally celebrated British author, 
                    best known for creating the best-selling Harry Potter fantasy series, 
                    which has captivated millions of readers worldwide..</p>
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

export default AuthorsProfile;