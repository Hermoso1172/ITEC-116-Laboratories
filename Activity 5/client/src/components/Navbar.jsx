import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white text-gray-800 shadow-sm sticky top-0 z-50">
      {/* Logo / Brand */}
      <Link to={"/main"} className="font-semibold text-lg tracking-tight">
        Blogify :)
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <Link
          to={"profile"}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200"
        >
          My Profile
        </Link>

        <button
          type="button"
          onClick={() => logout()}
          className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
