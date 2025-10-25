export const getAllNotes = async (controller, folderId = null) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const url = new URL("http://localhost:3000/notes");
    if (folderId) {
      url.search = new URLSearchParams({ folderId }).toString();
    }

    const response = await fetch(url.toString(), {
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

export const getNotes = async (id, controller) => {
  try {
    console.log("hi");
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
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

export const createNotes = async (body) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:3000/notes", {
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

export const updateNotes = async (id, body) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`http://localhost:3000/notes/${id}`, {
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
