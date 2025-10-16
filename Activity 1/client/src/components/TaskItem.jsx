import React, { useState, useRef, useEffect } from "react";
import { Trash2, FilePenLine, CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskItem({ title, isActive, onToggle, onCancel, handleDelete }) {
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

  const handleSave = (e) => {
    e.stopPropagation();
    console.log("Save clicked");
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
          <input type="radio" className="mr-5" />
          <p>{title}</p>
        </div>
        <div className="flex gap-3 items-center mr-5">
          <FilePenLine size={20} className="cursor-pointer" />
          <Trash2
            size={20}
            onClick={handleDelete}
            className="cursor-pointer hover:text-red-500"
          />
        </div>
      </div>

      {/* Expanded Details */}
      {isActive && (
        <div className="mt-3 ml-8 text-sm text-gray-600 relative">
          <p className="my-3">Description</p>

          <div className="flex items-center">
            {/* Left side */}
            <div className="flex w-1/2 items-center relative">
              {/* Calendar trigger */}
              <div
                ref={calendarButtonRef}
                className="flex items-center w-1/2 text-[#BC4434] cursor-pointer relative"
                onClick={handleCalendarClick}
              >
                <CalendarDays size={20} className="mr-2" />
                <p>Today</p>

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
              <select
                className="bg-[#8E7171] text-white p-1 px-3 rounded ml-3"
                onClick={(e) => e.stopPropagation()}
              >
                <option>Projects</option>
              </select>
            </div>

            {/* Right side */}
            <div className="w-1/2">
              <div className="flex w-1/2 justify-between justify-self-end">
                <button
                  className="bg-[#8E7171]/17 rounded-xl p-1 px-3 w-30 text-black"
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#8E7171] text-white rounded-xl p-1 px-3 w-30"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
