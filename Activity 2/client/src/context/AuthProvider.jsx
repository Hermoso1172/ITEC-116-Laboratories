import React, { createContext, useContext, useState, useEffect } from "react";
import { login } from "../services/authService";

// Create the context
const AuthContext = createContext();

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // useful while checking localStorage

  // On mount, check localStorage for JWT and user
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  const handleLogin = async (accessToken, user) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(JSON.stringify(user));
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };
  return (
    <AuthContext.Provider value={{ currentUser, logout, handleLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
