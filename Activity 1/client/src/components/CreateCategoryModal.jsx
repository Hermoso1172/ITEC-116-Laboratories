import { useEffect, useState } from "react";

function CreateTaskModal({ isOpen, setIsOpen, getAllCategories }) {
  const [categoryForm, setCategoryForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryForm),
      });
      if (response.status === 201) {
        getAllCategories();
        setCategoryForm({ name: "" });
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full h-full ${
        isOpen ? "visible bg-stone-900/40" : "invisible"
      } flex justify-center items-center`}
      onClick={() => setIsOpen(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 rounded-md w-2xl px-4 py-2 flex flex-col gap-4 text-stone-700"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-medium text-xl text-gray-700">NEW CATEGORY</h1>
        <div className="flex flex-col gap-4 ">
          <label className="sr-only" htmlFor="name">
            Category Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="px-4 py-2 rounded-md border border-gray-200 bg-white"
            required
            placeholder="Category Name"
            value={categoryForm.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className=" px-4 py-2 rounded-md cursor-pointer font-medium hover:text-gray-900"
          >
            Cancel
          </button>

          <button className=" px-4 py-2 rounded-md bg-[#8E7171] cursor-pointer">
            <p className="text-white font-medium">Add Category</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskModal;
