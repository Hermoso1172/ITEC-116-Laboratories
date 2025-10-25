// src/App.js
import React from 'react';
import { useNavigate } from "react-router-dom";

import bgImg from '../assets/bg.jpg';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can add authentication logic here
    // e.g. check username/password, etc.

    // If login is successful:
    navigate("/insideWeb");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-106">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">LOG IN</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full flex justify-end mb-6 text-[#333438]">
            <Link to="forgot">
                Forgot Password ?
            </Link>
          </div>

          
          <button
          onClick={handleLogin}
            type="submit"
            className="w-full py-2 bg-[#E5D1D2] text-white font-semibold rounded-lg hover:bg-[#D2C0C1] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Let's Start!
          </button>
          

          <div className="w-full flex justify-center my-6 ">
            <a href="">
                Don't have an account? 
                <Link to="signin">
                <span className='text-[#333438]'>Sign up</span>
                </Link>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;