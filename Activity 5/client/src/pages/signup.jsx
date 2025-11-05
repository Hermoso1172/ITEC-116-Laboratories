import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import SuccessPopup from "../components/SuccessPopup";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Signup() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(registerInfo);
      const data = await response.json(); // parse JSON body

      if (response.ok) {
        // 2xx status codes
        setShowPopup(true);
      } else if (response.status === 409) {
        // Conflict errors
        if (data.message === "Email already in use.") {
          alert("This email is already registered. Please use another.");
        } else if (data.message === "Username already in use.") {
          alert(
            "This username is already taken. Please choose a different one."
          );
        } else {
          alert("Something went wrong. Please try again.");
        }
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
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
              name="username"
              value={registerInfo.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4 relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={registerInfo.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4 relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={registerInfo.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6 relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={registerInfo.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
