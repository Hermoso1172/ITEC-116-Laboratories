import TaskItem from "../components/TaskItem";
import React, { useState } from "react";

function TodayComponent() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    // Toggle current item — if same, close; if different, open that one
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleCancel = () => {
    // Close all when Cancel is clicked
    setActiveIndex(null);
  };

  const tasks = [
    "Draft Title and Abstract",
    "Research Literature Review",
    "Presentation Preparation",
  ];

  return (
    <>
      <div className="mb-10">
        <h1 className="text-xl">Today</h1>
        <button type="button">
          <span className="text-xl">+</span> Add task
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            title={task}
            isActive={activeIndex === index}
            onToggle={() => handleToggle(index)}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </>
  );
}

export default TodayComponent;
