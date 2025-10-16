import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";

//PAGES
import Today from "./pages/Today.jsx";
import Calendar from "./pages/Calendar.jsx";
import ByCategory from "./pages/ByCategory.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-[220px] p-5 flex-1 transition-all duration-300">
          <Routes>
            <Route path="/today" element={<Today />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/category/:categoryId" element={<ByCategory />} />
            <Route path="*" element={<h2>Welcome! Select a page.</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
