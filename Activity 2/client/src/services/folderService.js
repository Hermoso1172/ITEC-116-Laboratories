export const createFolder = async (body) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:3000/folders", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFolder = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`http://localhost:3000/folders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllFolders = async (controller, folderId = null) => {
  try {
    console.log("hi");
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:3000/folders", {
      method: "GET",
      signal: controller && controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateFolder = async (id, body) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`http://localhost:3000/folders/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
