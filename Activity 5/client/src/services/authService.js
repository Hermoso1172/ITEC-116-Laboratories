export const login = async (body) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (body) => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        username: body.username,
        password: body.password,
        about: "",
      }),
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = () => {
  try {
    // Remove the JWT from localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");

    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
