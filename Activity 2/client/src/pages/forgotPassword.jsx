import React from "react";
// ICON
import { Mail } from "lucide-react"; 
import { Link } from "react-router-dom";

// IMAGE
import bgImg from "../assets/bg.jpg";

const ForgotPassword = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Expanded Form Container */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-12 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Confirm Email Address
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Confirm your registered email address, to which the verification OTP will be sent.
        </p>

        <form className="space-y-8">
          {/* Email Input with Icon */}
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={22}
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#E5D1D2] text-white py-4 text-lg rounded-xl hover:bg-[#D2C0C1] transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline text-base font-medium"
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;