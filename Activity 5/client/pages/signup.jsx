import { useState } from "react";
import { Facebook, AtSign, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import SuccessPopup from "../components/SuccessPopup";

function Signup() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true); // show popup when signing up
  };

  return (
    <div className="relative min-h-screen flex text-stone-700 overflow-hidden">
      {/* Left Panel */}
      <div className="w-1/2 hidden md:flex items-center justify-center h-screen bg-gradient-to-b from-[#000000] to-[#7F7F7F] text-white">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6 max-w-md">
            To keep connected with us please login with your personal info
          </p>
          <Link
            to="/login"
            className="bg-transparent border-2 rounded-lg border-white hover:bg-white hover:text-gray-900 font-medium py-2 px-6 transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Create Account
          </h2>

          <div className="mb-4 relative">
            <User className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
              required
            />
          </div>

          <div className="mb-4 relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
              required
            />
          </div>

          <div className="mb-4 relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
              required
            />
          </div>

          <div className="mb-6 relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#E5D1D2] text-black font-semibold rounded-lg hover:bg-gray-800 hover:text-white transition"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Popup */}
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default Signup;
