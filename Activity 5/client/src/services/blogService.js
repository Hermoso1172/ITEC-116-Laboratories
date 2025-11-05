class BlogService {
  constructor() {
    this.accessToken = localStorage.getItem("accessToken");
    this.baseUrl = "http://localhost:3000/blogs";
  }

  // Create a new blog
  async create(formData) {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create blog:", error);
      throw error;
    }
  }

  // Fetch blogs with optional query params
  async fetchBlogs({ limit, offset, authorId, category } = {}) {
    try {
      const params = new URLSearchParams();
      if (limit) params.append("limit", limit);
      if (offset) params.append("offset", offset);
      if (authorId) params.append("authorId", authorId);
      if (category) params.append("category", category);

      const url = `${this.baseUrl}?${params.toString()}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      throw error;
    }
  }

  // Fetch a single blog by ID
  async fetchOne(blogId) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch blog with ID ${blogId}:`, error);
      throw error;
    }
  }

  // Update a blog by ID (supports FormData for picture uploads)
  async update(blogId, formData) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: formData, // FormData to support file upload
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to update blog with ID ${blogId}:`, error);
      throw error;
    }
  }

  async delete(blogId) {
    try {
      const response = await fetch(`${this.baseUrl}/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return true; // indicate success
    } catch (error) {
      console.error(`Failed to delete blog with ID ${blogId}:`, error);
      throw error;
    }
  }
}

export default BlogService;
