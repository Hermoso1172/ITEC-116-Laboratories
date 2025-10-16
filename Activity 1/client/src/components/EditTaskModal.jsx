import { useEffect, useState } from "react";

function EditTaskModal({ isOpen, setIsOpen, getAllTasks }) {
  const [categories, setCategories] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    categoryId: "",
  });
  const [newTaskForm, setNewTaskForm] = useState({
    name: "",
    description: "",
    dueDate: "",
    categoryId: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();
    const getTask = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/tasks/${Number(isOpen)}`,
          { signal: controller.signal }
        );

        if (response.status === 200) {
          const data = await response.json();
          setCurrentTask({
            name: data.name,
            description: data.description ?? "",
            dueDate: new Date(data.dueDate).toLocaleDateString("en-CA"),
            categoryId: data.categoryId,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTask();
  }, [isOpen]);

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
  }, [isOpen]);

  const handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(currentTask);

    const dueDateUTC = new Date(
      `${currentTask.dueDate}T00:00:00Z`
    ).toISOString();

    const taskData = {
      ...currentTask,
      dueDate: dueDateUTC,
      categoryId: Number(currentTask.categoryId),
    };

    try {
      const response = await fetch(`http://localhost:3000/tasks/${isOpen}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (response.status === 200) {
        getAllTasks();
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
        className="bg-orange-100 rounded-md w-2xl px-4 py-2 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="font-medium text-xl text-gray-700">UPDATE TASK</h1>
        <div className="flex flex-col gap-4 ">
          <label className="sr-only" htmlFor="name">
            Task Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className=""
            required
            placeholder="Task Name"
            value={currentTask.name}
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
            className=""
            placeholder="Description"
            value={currentTask.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="dueDate">Due Date</label>
          <input
            required
            id="dueDate"
            name="dueDate"
            type="date"
            className="px-2 py-1 rounded-md border border-stone-700"
            value={currentTask.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="description">Category</label>
          <select
            required
            name="categoryId"
            className="border bg-yellow-700 border-yellow-800 rounded-md px-2 py-1 text-white"
            value={currentTask.categoryId || ""} // fallback to empty
            onChange={handleChange}
          >
            {!currentTask.categoryId && (
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
            className=" px-4 py-2 rounded-md cursor-pointer hover:font-medium"
          >
            Cancel
          </button>

          <button className=" px-4 py-2 rounded-md bg-yellow-700 hover:bg-yellow-800">
            <p className="text-white font-medium">Update Task</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskModal;
