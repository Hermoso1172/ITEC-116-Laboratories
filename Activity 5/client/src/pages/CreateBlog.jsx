import React, { useState } from "react";
import MainContainer from "../components/MainContainer";
import { useAuth } from "../contexts/AuthProvider";
import BlogService from "../services/blogService"; // like your userService

function CreateBlog() {
  const { currentUser } = useAuth();
  const blogApi = new BlogService();

  const categories = [
    "commercial",
    "design",
    "nature",
    "people",
    "photography",
    "tech",
    "travel",
    "uncategorized",
  ];

  const [blog, setBlog] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    picture: null, // File object
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture" && files?.length > 0) {
      setBlog((prev) => ({ ...prev, picture: files[0] }));
    } else {
      setBlog((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("subtitle", blog.subtitle);
      formData.append("content", blog.content);
      formData.append("category", blog.category);
      if (blog.picture) {
        formData.append("picture", blog.picture);
      }
      formData.append("userId", currentUser.id);

      const data = await blogApi.create(formData); // backend call
      console.log("Blog created:", data);
      // redirect or clear form after creation
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col h-full min-h-screen bg-gray-50"
    >
      {/* Save Button */}
      <div className="flex justify-end px-6 py-3 bg-orange-400 border-b">
        <button
          type="submit"
          className="px-5 py-2 text-white rounded-md text-sm font-medium hover:bg-orange-500"
        >
          Create Blog
        </button>
      </div>

      {/* Editable Cover Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={blog.picture ? URL.createObjectURL(blog.picture) : "/image.png"}
          alt="Blog Cover"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-4 gap-4">
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="text-4xl sm:text-5xl font-bold bg-transparent border-none text-center focus:outline-none drop-shadow-2xl"
          />
          <textarea
            name="subtitle"
            value={blog.subtitle}
            onChange={handleChange}
            placeholder="Short subtitle"
            className="mt-3 text-lg w-7xl bg-transparent border-none text-center focus:outline-none drop-shadow-lg resize-none"
          />
          {/* Picture upload */}
          <label
            htmlFor="picture-upload"
            className="mt-2 px-3 py-1 rounded-md bg-gray-900 text-white text-sm cursor-pointer hover:bg-gray-800"
          >
            Change Cover Photo
          </label>
          <input
            type="file"
            name="picture"
            id="picture-upload"
            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
            onChange={handleChange}
            className="sr-only"
          />
        </div>
      </div>

      <MainContainer>
        <div className="bg-white px-4 flex-1 border-x border-x-gray-300 mx-auto w-full flex flex-col gap-4 pt-4 min-h-[calc(100vh-20rem)]">
          {/* Categories Section */}
          <div className="mx-auto  px-6 py-8 ">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    handleChange({ target: { name: "category", value: cat } })
                  }
                  className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                    blog.category === cat
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Editable Blog Content */}
          <textarea
            name="content"
            value={blog.content}
            onChange={(e) => {
              handleChange(e);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            rows={1}
            placeholder="Write your blog content here..."
            className="w-full font-medium focus:outline-none resize-y"
          />
        </div>
      </MainContainer>
    </form>
  );
}

export default CreateBlog;
