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
            <Book className="w-6 h-6"/>
            <h1 className="text-3xl font-bold">BookShelf</h1>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center  p-2 rounded gap-3 text-lg font-medium hover:bg-[#000000] hover:text-white cursor-pointer">
              <Compass /> Discovery
            </Link>
            <Link to="categories" className="flex items-center p-2 rounded gap-3 text-lg font-medium hover:bg-[#000000] hover:text-white cursor-pointer">
              <Layers /> Categories
            </Link>
            <Link to="authors" className="flex items-center p-2 rounded gap-3 text-lg font-medium cursor-pointer hover:bg-[#000000] hover:text-white">
              <User /> Author
            </Link>
          </div>
        </div>

        <div className="mt-10" />
</nav>
 
</>
 )
};
export default Sidebar;