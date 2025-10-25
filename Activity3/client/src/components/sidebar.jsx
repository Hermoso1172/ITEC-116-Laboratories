import {Link} from "react-router-dom";

import {
  Book,
  Compass,
  Layers,
  User,

} from "lucide-react";

function Sidebar () {
   
 return (
    <>
<nav className="w-64 bg-white shadow-lg flex flex-col p-6 justify-between">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Book className="text-blue-600" />
            <h1 className="text-2xl font-bold">BookShelf</h1>
          </div>

          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
              <Compass /> Discovery
            </Link>
            <Link to="categories" className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
              <Layers /> Categories
            </Link>
            <div className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
              <User /> Author
            </div>
          </div>
        </div>

        <div className="mt-10" />
</nav>
 
</>
 )
};
export default Sidebar;