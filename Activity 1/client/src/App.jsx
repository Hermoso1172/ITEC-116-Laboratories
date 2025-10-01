import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";

//PAGES
import Today from "./pages/Today.jsx";
import Calendar from "./pages/Calendar.jsx";
import Work from "./pages/Work.jsx";
import College from "./pages/College.jsx";
import Project from "./pages/Project.jsx";
import Submission from "./pages/Submission.jsx";
import Exams from "./pages/Exams.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-[220px] p-5 flex-1 transition-all duration-300">
          <Routes>
            <Route path="/today" element={<Today />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/work" element={<Work />} />
            <Route path="/college" element={<College />} />
            <Route path="/project" element={<Project />} />
            <Route path="/submission" element={<Submission />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="*" element={<h2>Welcome! Select a page.</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
