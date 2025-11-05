import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import MainContainer from "../components/MainContainer";
import CommentSection from "../components/CommentSection";
import BlogService from "../services/blogService";

function Blog() {
  const navigate = useNavigate();
  const { blogId } = useParams();
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

  const [blog, setBlog] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    console.log(blog);
  }, [blog]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogApi.fetchOne(blogId);
        setBlog(data);
        setIsOwner(currentUser?.id === data.userId);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChanges(true);
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("subtitle", blog.subtitle);
      formData.append("content", blog.content);
      formData.append("category", blog.category);
      if (blog.picture instanceof File) {
        formData.append("picture", blog.picture);
      }

      const updatedBlog = await blogApi.update(blog.id, formData);
      setBlog(updatedBlog);
      setIsEditing(false);
      setChanges(false);
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* OWNER VIEW */}
      {isOwner ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col h-full"
        >
          {/* Save Button */}
          <div className="flex justify-end px-6 py-3 bg-white w-full">
            <div className={`px-5 py-2`}></div>
          </div>
          <div className="flex justify-end px-6 py-3 bg-white border-b fixed top-13 z-50 w-full gap-4">
            <button
              type="button"
              onClick={async () => {
                if (
                  !window.confirm("Are you sure you want to delete this blog?")
                ) {
                  return;
                }

                try {
                  await blogApi.delete(blog.id);
                  // Redirect to home or blog list after deletion
                  navigate("/main");
                } catch (error) {
                  alert("Failed to delete blog. Please try again.");
                }
              }}
              className="px-5 py-2 text-white rounded-md bg-red-500 hover:bg-red-600 text-sm font-medium"
            >
              Delete Blog
            </button>
            <button
              type="submit"
              disabled={!changes}
              className={`px-5 py-2 text-white rounded-md ${
                changes ? "bg-orange-400 hover:bg-orange-500" : "bg-orange-200"
              } text-sm font-medium `}
            >
              Save Changes
            </button>
          </div>

          {/* Editable Cover Section */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={
                blog.picture
                  ? typeof blog.picture === "object"
                    ? URL.createObjectURL(blog.picture)
                    : `http://localhost:3000/public/${blog.picture}`
                  : "/default-avatar.png"
              }
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
                className="mt-2 px-4 py-2 rounded-md bg-gray-900 text-white text-sm cursor-pointer hover:bg-gray-800"
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
            <div className="bg-white  flex-1 border-x border-x-gray-300 mx-auto w-full flex flex-col gap-4 p-4 min-h-[calc(100vh-20rem)]">
              <div>
                <h1 className="font-bold text-gray-900 mb-2">
                  {blog.title || "Untitled Blog"}
                </h1>
                <p className="text-sm text-gray-500">
                  by{" "}
                  <span className="font-medium text-gray-700">
                    {blog.user.username || "Unknown Author"}
                  </span>{" "}
                  · {blog.date || "Nov 5, 2025"}
                </p>
              </div>

              {/* Categories Section */}
              <div className="mx-auto w-full border-y border-y-gray-300 px-6 py-8 ">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "category", value: cat },
                        })
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
                className="w-full font-medium focus:outline-none resize-y bg-gray-100 rounded-md px-4 py-2 "
              />

              <CommentSection
                comments={blog.comments}
                blogId={blogId}
                onAddComment={(newComment) =>
                  setBlog((prev) => ({
                    ...prev,
                    comments: [...(prev.comments || []), newComment],
                  }))
                }
                onUpdateComment={(updatedComment) => {
                  const latestComments = [...(blog.comments || [])];
                  const withUpdate = latestComments.map((c) => {
                    if (c.id === updatedComment.id) {
                      return updatedComment;
                    } else {
                      return c;
                    }
                  });
                  setBlog((prev) => ({ ...prev, comments: withUpdate }));
                }}
                onDeleteComment={(commentId) => {
                  const latestComments = [...(blog.comments || [])];
                  const remainingComments = latestComments.filter(
                    (c) => c.id !== commentId
                  );
                  setBlog((prev) => ({
                    ...prev,
                    comments: remainingComments,
                  }));
                }}
              />
            </div>
          </MainContainer>
        </form>
      ) : (
        /* ✅ READER VIEW */
        <div className="flex flex-col h-full">
          {/* Cover Section */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={blog.picture}
              alt="Blog Cover"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-4">
              <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-2xl">
                {blog.title}
              </h1>
              <p className="mt-3 text-lg max-w-3xl drop-shadow-lg">
                {blog.subtitle}
              </p>
            </div>
          </div>

          <MainContainer>
            <div className="bg-white px-4 flex-1 border-x border-x-gray-300 mx-auto w-full flex flex-col gap-4 pt-4 min-h-[calc(100vh-20rem)]">
              <div>
                <h1 className="font-bold text-gray-900 mb-2">{blog.title}</h1>
                <p className="text-sm text-gray-500">
                  by{" "}
                  <span className="font-medium text-gray-700">
                    {blog.user.username || "Unknown Author"}
                  </span>{" "}
                  · {blog.date || "Nov 5, 2025"}
                </p>
              </div>

              {/* Categories Section */}
              <div className="mx-auto w-full border-y border-y-gray-300 px-6 py-8 ">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
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
              <div className="whitespace-pre-wrap text-gray-800 font-medium">
                {blog.content}
              </div>

              <CommentSection
                comments={blog.comments}
                blogId={blogId}
                onAddComment={(newComment) =>
                  setBlog((prev) => ({
                    ...prev,
                    comments: [...(prev.comments || []), newComment],
                  }))
                }
                onUpdateComment={(updatedComment) => {
                  const latestComments = [...(blog.comments || [])];
                  const withUpdate = latestComments.map((c) => {
                    if (c.id === updatedComment.id) {
                      return updatedComment;
                    } else {
                      return c;
                    }
                  });
                  setBlog((prev) => ({ ...prev, comments: withUpdate }));
                }}
                onDeleteComment={(commentId) => {
                  const latestComments = [...(blog.comments || [])];
                  const remainingComments = latestComments.filter(
                    (c) => c.id !== commentId
                  );
                  setBlog((prev) => ({
                    ...prev,
                    comments: remainingComments,
                  }));
                }}
              />
            </div>
          </MainContainer>
        </div>
      )}
    </div>
  );
}

export default Blog;
