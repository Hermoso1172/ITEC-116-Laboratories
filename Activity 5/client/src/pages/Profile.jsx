import React, { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";
import BlogCard from "../components/BlogCards"; // make sure this import exists
import { useAuth } from "../contexts/AuthProvider";
import UserService from "../services/userService";
import { Link } from "react-router-dom";
import BlogService from "../services/blogService"; // import your BlogService

function Profile() {
  const { currentUser, updateCurrentUser } = useAuth();
  const userApi = new UserService();
  const blogApi = new BlogService(); // for fetching posts

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!currentUser) return; // wait until currentUser is available

    const fetchUserPosts = async () => {
      try {
        const data = await blogApi.fetchBlogs({ authorId: currentUser.id });
        setPosts(data.data);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      }
    };

    fetchUserPosts();
  }, [currentUser]); // run when currentUser is set or changes

  const [formData, setFormData] = useState({
    name: currentUser.email || "",
    username: currentUser.username || "",
    about: currentUser.about || "",
    picture: null, // store File object
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files.length > 0) {
      setFormData((prev) => ({ ...prev, picture: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("about", formData.about || "");
      if (formData.picture) {
        formDataToSend.append("picture", formData.picture);
      }

      const data = await userApi.updateUser(formDataToSend);
      updateCurrentUser(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <MainContainer>
      <div className="mx-auto px-6 py-10 flex flex-col gap-10 w-full">
        {/* Profile Info Section */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Profile Information
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-6 flex flex-col gap-6"
          >
            {/* Profile Picture + Info */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center sm:items-start gap-3 justify-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={
                      formData.picture
                        ? URL.createObjectURL(formData.picture)
                        : `http://localhost:3000/public/${currentUser.picture}` ||
                          "/default-avatar.png"
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  name="picture"
                  accept=".png, .jpg, .jpeg, image/png, image/jpeg"
                  id="picture-upload"
                  onChange={handleChange}
                  className="sr-only"
                />

                {/* Label acting as button */}
                <label
                  htmlFor="picture-upload"
                  className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  Change Photo
                </label>
              </div>

              {/* Name + Username */}
              <div className="flex flex-col flex-1 gap-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>

                {/* Username */}
                <div className="flex flex-col">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="flex flex-col">
              <label
                htmlFor="about"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                About Me
              </label>
              <textarea
                name="about"
                id="about"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                placeholder="Write something about yourself..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* My Posts Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">My Posts</h2>

            {posts.length !== 0 && (
              <Link
                to={"/main/blog/add"}
                className="flex items-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-sm  hover:bg-gray-800 transition-all duration-200"
              >
                <span>＋</span>
                Create Post
              </Link>
            )}
          </div>

          {/* Posts List (Backend-Ready) */}
          {posts.length === 0 ? (
            <div className="border border-gray-200 rounded-xl bg-white p-6 text-gray-600 text-sm flex flex-col items-center justify-center gap-3">
              <p>You haven’t created any posts yet.</p>
              <Link
                to={"/main/blog/add"}
                className="mt-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainContainer>
  );
}

export default Profile;
