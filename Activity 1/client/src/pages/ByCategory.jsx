import TaskItem from "../components/TaskItem";
import { useState, useEffect } from "react";
import CreateTaskModal from "../components/CreateTaskModal";
import { useParams } from "react-router-dom";
import EditTaskModal from "../components/EditTaskModal";

function ByCategory() {
  const { categoryId } = useParams();
  const [taskList, setTaskList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);

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

  const handleEdit = async (e, id) => {
    e.stopPropagation();

    setEditTaskModal(id);
  };

  const handleComplete = async (e, task) => {
    e.stopPropagation();

    const taskData = {
      ...task,
      completed: e.target.checked,
    };

    console.log(taskData);

    delete taskData.id;
    delete taskData.category;

    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${Number(task.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );
      if (response.status === 200) {
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
  }, [categoryId]);

  const getAllTasks = async (parameters = {}) => {
    try {
      const url = new URL("http://localhost:3000/tasks");
      url.search = new URLSearchParams({ categoryId: categoryId }).toString();

      const response = await fetch(url, parameters);
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
      <CreateTaskModal
        isOpen={createTaskModal}
        setIsOpen={setCreateTaskModal}
        categoryId={categoryId}
        getAllTasks={getAllTasks}
      />
      <EditTaskModal
        isOpen={editTaskModal}
        setIsOpen={setEditTaskModal}
        getAllTasks={getAllTasks}
      />
      <div className="mb-10 flex flex-col gap-4">
        <h1 className="text-xl">Tasks</h1>
        <button
          type="button"
          onClick={() => setCreateTaskModal(true)}
          className="border w-fit border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          <p className="font-medium">
            <span className="text-[#8E7171] text-xl">+</span> Add task
          </p>
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
                handleEdit={(e) => handleEdit(e, task.id)}
                handleDelete={(e) => handleDelete(e, task.id)}
                handleComplete={(e) => handleComplete(e, task)}
                onCancel={handleCancel}
                data={task}
              />
            );
          })
        ) : (
          <>
            <p className="px-4 py-2 border border-gray-300 rounded-md text-gray-500">
              You have no tasks yet. Add one now by clicking the{" "}
              <span className="font-medium text-stone-700 text-sm">
                + Add Task
              </span>
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default ByCategory;
