import React, { useState, useEffect } from "react";
import "../App.css";
import backgroundImage from "../assets/bg.jpg";

// ICONS from lucide-react
import {
  Facebook,
  AtSign,
  User,
  Mail,
  Lock,
  CheckCircle,
} from "lucide-react";

const SignupPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  // Auto close popup after 2 seconds
  useEffect(() => {
    if (showPopup) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 1500);
      const closeTimer = setTimeout(() => {
        setShowPopup(false);
        setFadeOut(false);
      }, 2000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [showPopup]);

  const handleBackToLogin = () => {
    // Ito ung sa link para sa router kung ito gagamitin
    window.location.href = "/login";
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Left Side Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center h-screen relative">
        <img
          src={backgroundImage}
          alt="Side Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/40">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6 max-w-md">
            To keep connected with us please login with your personal info
          </p>
          <button className="bg-transparent border-2 rounded-lg hover:bg-blue-700 text-white font-semibold py-2 px-6 transition duration-200">
            Sign in
          </button>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Create Account
          </h2>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            <button type="button" className="text-blue-600 hover:text-blue-800">
              <Facebook size={28} />
            </button>
            <button type="button" className="text-gray-600 hover:text-gray-800">
              <AtSign size={28} />
            </button>
          </div>

          <p className="w-full text-center mb-4">
            or use your email for registration
          </p>

          {/* Username Field */}
          <div className="mb-4 relative">
            <User className="absolute top-3 left-3 text-black" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4 relative">
            <Mail className="absolute top-3 left-3 text-black" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <Lock className="absolute top-3 left-3 text-black" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 relative">
            <Lock className="absolute top-3 left-3 text-black" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#E5D1D2] text-black py-2 rounded hover:bg-blue-700 hover:text-white transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>

  
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div
            className={`bg-white rounded-2xl shadow-2xl p-8 text-center w-80 transform transition-opacity duration-500 ${
              fadeOut ? "opacity-0" : "opacity-100"
            }`}
          >
            <CheckCircle className="mx-auto text-green-500 mb-3" size={50} />
            <h3 className="text-xl font-semibold mb-2">Account Created!</h3>
            <p className="text-gray-600 mb-4">
              Your account has been successfully created.
            </p>
            {/* Back to Login Button */}
            <button
              onClick={handleBackToLogin}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;