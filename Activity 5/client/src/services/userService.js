class UserService {
  constructor() {
    this.accessToken = localStorage.getItem("accessToken");
  }

  async updateUser(formData) {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${this.accessToken}`, // don't set Content-Type for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  }
}

export default UserService;
