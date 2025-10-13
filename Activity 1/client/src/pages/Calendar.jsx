import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import App from "../App"

function Calendar() {
  return (
    <div className="w-full h-full p-4 bg-white rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Calendar</h1>
      <div className="w-full h-full">
        <DatePicker inline calendarClassName="custom-calendar" />
      </div>
    </div>
  );
}

export default Calendar;
