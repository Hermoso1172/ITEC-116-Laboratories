// src/components/SuccessPopup.jsx
import React from "react";

const EditBloguccessPopup = ({ message, show }) => {
  if (!show) return null; // Do not render if not visible

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 text-center animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800">
          {message || "Action completed successfully!"}
        </h2>
      </div>
    </div>
  );
};

export default EditBloguccessPopup;
