import React, { useState, useEffect } from "react";
import "../App.css";
import backgroundImage from "../assets/bg.jpg";

// ICONS from lucide-react
import { Facebook, AtSign, User, Mail, Lock, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
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

  const handleBackToLogin = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen flex text-stone-700">
      {/* Left Side Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center h-screen relative">
        <img
          src={"/image.png"}
          alt="Side Visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center ">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg mb-6 max-w-md">
            To keep connected with us please login with your personal info
          </p>
          <Link
            to="/"
            className="bg-transparent border-2 rounded-lg border-stone-500 hover:border-stone-900 font-medium py-2 px-6"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Create Account
          </h2>

          {/* Username Field */}
          <div className="mb-4 relative">
            <User className="absolute top-3 left-3 text-black" size={20} />
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

          {/* Email Field */}
          <div className="mb-4 relative">
            <Mail className="absolute top-3 left-3 text-black" size={20} />
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

          {/* Password Field */}
          <div className="mb-4 relative">
            <Lock className="absolute top-3 left-3 text-black" size={20} />
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

          {/* Confirm Password Field */}
          <div className="mb-6 relative">
            <Lock className="absolute top-3 left-3 text-black" size={20} />
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-red-200 text-white font-semibold rounded-lg hover:bg-red-300 cursor-pointer "
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
