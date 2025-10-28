import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function SuccessPopup() {
  return (
    // ✅ Transparent overlay with background still visible
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center w-80 border border-gray-200">
        <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Account Created!
        </h2>
        <p className="text-gray-600 mb-6">
          Welcome to the community, 
you’re all set!
        </p>

        <div className="flex flex-col space-y-3">
          <Link
            to="/login"
            className="bg-[#E5D1D2] text-black py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
          >
            Go to Login
          </Link>

        </div>
      </div>
    </div>
  );
}

export default SuccessPopup;