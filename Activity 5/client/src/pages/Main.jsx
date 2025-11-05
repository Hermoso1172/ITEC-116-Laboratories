import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MainContainer from "../components/MainContainer";
import BlogCard from "../components/BlogCards";
import Pagination from "../components/Pagination";
import BlogService from "../services/blogService";

function Main() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0); // to calculate total pages
  const blogsPerPage = 9;

  const blogApi = new BlogService();

  const categories = [
    "All",
    "commercial",
    "design",
    "nature",
    "people",
    "photography",
    "tech",
    "travel",
    "uncategorized",
  ];

  // Fetch blogs whenever activeCategory or currentPage changes
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const limit = blogsPerPage;
        const offset = (currentPage - 1) * blogsPerPage;

        const response = await blogApi.fetchBlogs({
          limit,
          offset,
          category: activeCategory === "All" ? undefined : activeCategory,
        });

        // Assuming your backend returns { data: [...blogs], total: number }
        setBlogs(response.data);
        setTotalBlogs(response.meta.totalItems);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [activeCategory, currentPage]);

  console.log(totalBlogs);
  console.log(blogsPerPage);

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);

  return (
    <div>
      <Hero />
      <MainContainer>
        {/* Categories Section */}
        <div className="w-full px-6 py-8 border-b border-b-gray-300">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1); // Reset to first page on category change
                }}
                className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.id || index} {...blog} />
          ))}
        </div>

        {/* Pagination Section */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </MainContainer>
    </div>
  );
}

export default Main;
