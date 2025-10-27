import React from "react";

function NewCategoryModal() {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Add New Category
        </h1>

        <label className="block font-medium mb-1">Category Name</label>
        <input
          type="text"
          placeholder="Enter category name"
          className="border p-2 rounded-md w-full mb-4"
        />

        <label className="block font-medium mb-1">Description</label>
        <textarea
          placeholder="Enter description"
          className="border p-2 rounded-md w-full mb-5"
          rows="3"
        ></textarea>

        <div className="flex items-center">
          <img
            src={formData.icon}
            alt={formData.name}
            className="w-40 h-40 rounded-full object-cover mr-10 bg-gray-200"
          />
          <button className="bg-[#D9D9D9] h-10 px-3 text-black rounded">
            Change File
          </button>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowAddPopup(false)}
            className="px-4 py-2 rounded-md bg-[#D9D9D9]"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveNew}
            className="px-4 py-2 bg-[#000000] text-white rounded-md hover:bg-[#000000]/60"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCategoryModal;
