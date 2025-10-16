import React from "react";
import "../App.css";
import backgroundImage from "../assets/bg.jpg";

// ICONS from lucide-react
import {
  Facebook,
  AtSign,
  User,
  Mail,
  Lock
} from "lucide-react";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side Image with Centered Text */}
      <div className="w-1/2 hidden md:flex items-center justify-center h-screen relative">
        <img
          src={backgroundImage}
          alt="Side Visual"
          className="w-full h-full object-cover"
        />

        {/* Overlay with centered content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/40">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6 max-w-md">
            To keep connected with us please login with your personal info
          </p>
          <button className="bg-transparent border-2 w-50 rounded-4xl hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
            Sign in
          </button>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <form className="w-full max-w-md bg-white p-8">
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
            />
          </div>

          {/* Email Field */}
          <div className="mb-4 relative">
            <Mail className="absolute top-3 left-3 text-black" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <Lock className="absolute top-3 left-3 text-black" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 relative">
            <Lock className="absolute top-3 left-3 text-black" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#E5D1D2] text-black py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
