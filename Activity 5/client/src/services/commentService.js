class CommentService {
  constructor() {
    this.accessToken = localStorage.getItem("accessToken");
    this.baseUrl = "http://localhost:3000/comments";
  }

  // ✅ Create a new comment
  async create(blogId, content) {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({ blogId, content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create comment:", error);
      throw error;
    }
  }

  // ✅ Update a comment (only if owner)
  async update(commentId, content) {
    try {
      const response = await fetch(`${this.baseUrl}/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update comment:", error);
      throw error;
    }
  }

  // ✅ Delete a comment (only if owner)
  async delete(commentId) {
    try {
      const response = await fetch(`${this.baseUrl}/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      throw error;
    }
  }
}

export default CommentService;
