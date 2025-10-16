import { parseJSON } from "date-fns";
import TaskItem from "../components/TaskItem";
import { useState, useEffect } from "react";
import CreateTaskModal from "../components/CreateTaskModal";

function TodayComponent() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [taskList, setTaskList] = useState([]);

  const handleToggle = (index) => {
    // Toggle current item — if same, close; if different, open that one
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleCancel = () => {
    // Close all when Cancel is clicked
    setActiveIndex(null);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const deleteConfirmation = confirm(
      "Are you sure you want to delete this task?"
    );
    if (!deleteConfirmation) return;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        alert("Task deleted successfully.");
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch all tasks
  useEffect(() => {
    const controller = new AbortController();

    getAllTasks({ signal: controller.signal });
    return () => controller.abort();
  }, []);

  const getAllTasks = async (parameters = {}) => {
    try {
      const response = await fetch("http://localhost:3000/tasks", parameters);
      if (response.status === 200) {
        const data = await response.json();
        setTaskList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CreateTaskModal />
      <div className="mb-10 flex flex-col gap-4">
        <h1 className="text-xl">Today</h1>
        <button
          type="button"
          className="border w-fit border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <p className="font-medium">+ Add task</p>
        </button>
      </div>

      <div className="space-y-2">
        {taskList.length > 0 ? (
          taskList.map((task, index) => {
            return (
              <TaskItem
                key={task.id}
                title={task.name}
                isActive={activeIndex === index}
                onToggle={() => handleToggle(index)}
                onCancel={handleCancel}
                handleDelete={(e) => handleDelete(e, task.id)}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default TodayComponent;
