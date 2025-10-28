import { useEffect, useState } from "react";

function EditBookModal({
  id,
  setShowEditPopup,
  showMessage,
  categoryId = "",
  authorId = "",
  getAll,
}) {
  const [formData, setFormData] = useState({
    id: id || "",
    name: "",
    categoryId: categoryId || "",
    authorId: authorId || "",
    description: "",
    picture: "",
  });
  const [authorOptions, setAuthorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [preview, setPreview] = useState("/gray.jpg");

  //fetch author options
  useEffect(() => {
    if (!formData.id) {
      setShowEditPopup(false);
      return;
    }
    const controller = new AbortController();
    getBookInfo(controller);
    getAllAuthors(controller);
    getAllCategories(controller);
    return () => controller.abort();
  }, [formData.id]);
  const getBookInfo = async (controller) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      setPreview(`http://localhost:3000/public/${data.picture}`);
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllAuthors = async (controller) => {
    try {
      const response = await fetch("http://localhost:3000/authors", {
        method: "GET",
        signal: controller ? controller.signal : null,
      });
      if (response.status === 200) {
        const data = await response.json();
        setAuthorOptions(
          data.map((author) => ({
            value: author.id,
            name: author.name,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCategories = async (controller) => {
    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "GET",
        signal: controller ? controller.signal : null,
      });
      if (response.status === 200) {
        const data = await response.json();
        setCategoryOptions(
          data.map((author) => ({
            value: author.id,
            name: author.name,
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    const name = e.target.name;
    const type = e.target.type;
    let value;
    if (type === "file") {
      value = e.target.files[0];
      setPreview(URL.createObjectURL(value));
    } else {
      value = e.target.value;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const { id, name, description, categoryId, authorId, picture } = formData;

    if (
      [id, name, description, categoryId, authorId, picture].some(
        (field) => !field
      )
    ) {
      alert("Please make sure required fields are not empty");
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("picture", formData.picture);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("authorId", Number(formData.authorId));
    formDataToSend.append("categoryId", Number(formData.categoryId));
    try {
      const response = await fetch(
        `http://localhost:3000/books/${formData.id}`,
        {
          method: "PATCH",
          body: formDataToSend,
        }
      );
      if (response.status === 200) {
        showMessage("Book updated successfully!");
        await getAll();
        setShowEditPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Book</h1>

        <label className="block font-medium mb-1">Book Title</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          placeholder="Enter Author Name"
          className="border p-2 rounded-md w-full mb-4"
          onChange={handleChange}
        />

        <label className="block font-medium mb-1">Author</label>
        <select
          name="authorId"
          id="authorId"
          value={formData.authorId}
          className="px-4 py-2 rounded-md border"
          onChange={handleChange}
        >
          <option value={""} selected disabled>
            Select Author
          </option>
          {authorOptions.map((author) => {
            return (
              <option key={author.value} value={author.value}>
                {author.name}
              </option>
            );
          })}
        </select>

        <label className="block font-medium mb-1">Category</label>
        <select
          name="categoryId"
          id="categoryId"
          value={formData.categoryId}
          className="px-4 py-2 rounded-md border"
          onChange={handleChange}
        >
          <option value={""} selected disabled>
            Select Category
          </option>
          {categoryOptions.map((category) => {
            return (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            );
          })}
        </select>

        <label className="block font-medium mb-1">Description</label>
        <textarea
          placeholder="Enter description"
          className="border p-2 rounded-md w-full mb-5"
          rows="3"
          value={formData.description}
          name="description"
          id="description"
          onChange={handleChange}
        />
        <div className="flex items-center">
          <img
            src={preview}
            alt={formData.name}
            className="w-40 h-40 rounded-full object-cover mr-10"
          />
          <label className="bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-md px-4 py-2">
            Change File
            <input
              type="file"
              onChange={handleChange}
              name="picture"
              id="picture"
              accept=".png, .jpg, .jpeg"
              className="sr-only"
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowEditPopup(false)}
            className="px-4 py-2 rounded-md bg-[#D9D9D9]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#000000] text-white rounded-md hover:bg-[#000000]/60"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditBookModal;
