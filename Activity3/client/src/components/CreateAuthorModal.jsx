import React, { useState } from "react";

function CreateAuthorModal({ setShowAddPopup, showMessage }) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    picture: "",
  });
  const [preview, setPreview] = useState("/gray.jpg");

  function handleChange(e) {
    const name = e.target.name;
    const type = e.target.type;
    let value;
    if (type === "file") {
      value = e.target.files[0];
      setPreview(URL.createObjectURL(value));
    } else {
      value = e.target.value;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("picture", formData.picture);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("bio", formData.bio);

    try {
      const response = await fetch("http://localhost:3000/authors", {
        method: "POST",
        body: formDataToSend,
      });
      if (response.status === 201) {
        showMessage("Author profile updated successfully!");
        setShowAddPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Author</h1>

        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          placeholder="Enter Author Name"
          className="border p-2 rounded-md w-full mb-4"
          onChange={handleChange}
        />

        <label className="block font-medium mb-1">Bio</label>
        <textarea
          placeholder="Enter description"
          className="border p-2 rounded-md w-full mb-5"
          rows="3"
          value={formData.bio}
          name="bio"
          id="bio"
          onChange={handleChange}
        />
        <div className="flex items-center">
          <img
            src={preview}
            alt={formData.name}
            className="w-40 h-40 rounded-full object-cover mr-10"
          />
          <label className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-md px-4 py-2">
            Change File
            <input
              type="file"
              onChange={handleChange}
              name="picture"
              id="picture"
              accept=".png, .jpg, .jpeg"
              className="sr-only"
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowAddPopup(false)}
            className="px-4 py-2 rounded-md bg-[#D9D9D9]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#000000] text-white rounded-md hover:bg-[#000000]/60"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateAuthorModal;
