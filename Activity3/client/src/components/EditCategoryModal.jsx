import { useEffect, useState } from "react";

function EditCategoryModal({ id, showMessage, setShowEditPopup, getAll }) {
  const [formData, setFormData] = useState({
    id: id || "",
    name: "",
    description: "",
    picture: "",
  });
  const [preview, setPreview] = useState("/gray.jpg");

  useEffect(() => {
    if (!formData.id) {
      setShowEditPopup(false);
      return;
    }

    const controller = new AbortController();
    const getCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/categories/${id}`, {
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
    getCategory();
  }, [formData.id]);

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

    const formDataToSend = new FormData();

    formDataToSend.append("picture", formData.picture);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);

    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "PATCH",
        body: formDataToSend,
      });
      if (response.status === 200) {
        showMessage("Category updated successfully!");
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
        <h1 className="text-2xl font-bold mb-6 text-center">
          {formData.name || ""}
        </h1>

        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          placeholder="Enter Category Name"
          className="border p-2 rounded-md w-full mb-4"
          onChange={handleChange}
        />

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
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditCategoryModal;
