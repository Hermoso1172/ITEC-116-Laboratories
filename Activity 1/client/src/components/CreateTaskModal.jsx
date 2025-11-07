import { useEffect, useState } from "react";

function CreateTaskModal({
  isOpen,
  setIsOpen,
  categoryId = null,
  getAllTasks,
}) {
  const [categories, setCategories] = useState([]);
  const [newTaskForm, setNewTaskForm] = useState({
    name: "",
    description: "",
    dueDate: "",
    categoryId: categoryId ? categoryId : "",
  });
  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();

    const getAllCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories", {
          signal: controller.signal,
        });
        if (response.status === 200) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {}
    };

    getAllCategories();

    return () => controller.abort();
  }, [isOpen]);

  const handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    setNewTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newTaskForm);

    const dueDateUTC = new Date(
      `${newTaskForm.dueDate}T00:00:00Z`
    ).toISOString();

    const taskData = {
      ...newTaskForm,
      dueDate: dueDateUTC,
      categoryId: Number(newTaskForm.categoryId),
    };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (response.status === 201) {
        getAllTasks();
        alert("Task Created Successfully.");
        setNewTaskForm({
          name: "",
          description: "",
          dueDate: "",
          categoryId: categoryId ? categoryId : "",
        });
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
        className="bg-gray-100 rounded-md w-2xl px-4 py-2 flex flex-col gap-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-medium text-xl text-gray-700">NEW TASK</h1>
        <div className="flex flex-col gap-4 ">
          <label className="sr-only" htmlFor="name">
            Task Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="bg-white text-stone-700 rounded-md px-4 py-2 border border-gray-200"
            required
            placeholder="Task Name"
            value={newTaskForm.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <label className="sr-only" htmlFor="description">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            className="bg-white text-stone-700 rounded-md px-4 py-2 border border-gray-200"
            placeholder="Description"
            value={newTaskForm.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="dueDate" className="w-24 font-medium text-stone-700">
            Due Date
          </label>
          <input
            required
            id="dueDate"
            name="dueDate"
            type="date"
            className="px-4 py-2 rounded-md border bg-white text-stone-700 border-stone-700"
            value={newTaskForm.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label
            htmlFor="categoryId"
            className="w-24 font-medium text-stone-700"
          >
            Category
          </label>
          <select
            required
            id="categoryId"
            name="categoryId"
            className="border bg-[#8E7171]  rounded-md px-4 py-2 text-white"
            value={newTaskForm.categoryId} // fallback to empty
            onChange={handleChange}
          >
            {!categoryId && (
              <option value="" disabled>
                Select Category
              </option>
            )}

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className=" px-4 py-2 rounded-md cursor-pointer font-medium text-stone-700 hover:text-stone-800"
          >
            Cancel
          </button>

          <button className=" px-4 py-2 rounded-md bg-[#8E7171] ">
            <p className="text-white font-medium">Add Task</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskModal;
