import React, { useState, useRef, useEffect } from "react";
import { Trash2, FilePenLine, CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskItem({
  title,
  isActive,
  onToggle,
  onCancel,
  handleEdit,
  handleDelete,
  handleComplete,
  data,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const calendarButtonRef = useRef(null);

  const handleCalendarClick = (e) => {
    e.stopPropagation();
    setShowCalendar((prev) => !prev);
  };

  const handleCancelClick = (e) => {
    e.stopPropagation();
    setShowCalendar(false);
    if (onCancel) onCancel(); // tell parent to close all
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        calendarButtonRef.current &&
        !calendarButtonRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div
      className="relative flex flex-col border-y p-3 cursor-pointer"
      onClick={onToggle}
    >
      {/* Task Row */}
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            onClick={(e) => {
              e.stopPropagation();
              handleComplete(e, data);
            }}
            className="mr-5"
            checked={data.completed}
          />

          <p className={`${data.completed ? "line-through" : ""}`}>{title}</p>
        </div>
        <div className="flex gap-3 items-center mr-5">
          <FilePenLine
            size={20}
            onClick={handleEdit}
            className="cursor-pointer hover:text-sky-500"
          />
          <Trash2
            size={20}
            onClick={handleDelete}
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      </div>

      {/* Expanded Details */}
      {isActive && (
        <div className="mt-3 ml-8 text-sm flex flex-col gap-4 text-gray-600 relative">
          <p className="my-3">{data.description || "No Description"}</p>

          <div className="flex justify-between">
            {/* Left side */}
            <div className="flex gap-4 items-center relative">
              {/* Calendar trigger */}
              <div
                ref={calendarButtonRef}
                className="flex items-center gap-4 text-[#BC4434] cursor-pointer relative"
                onClick={handleCalendarClick}
              >
                <CalendarDays size={20} className="" />
                <p>{new Date(data.dueDate).toLocaleDateString("en-CA")}</p>

                {/* Floating Calendar */}
                {showCalendar && (
                  <div
                    ref={calendarRef}
                    className="absolute left-0 top-6 z-50 bg-white shadow-lg border rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      inline
                    />
                  </div>
                )}
              </div>

              {/* Select */}
              <p className="bg-[#8E7171] text-white p-1 px-3 rounded">
                {data.category.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
