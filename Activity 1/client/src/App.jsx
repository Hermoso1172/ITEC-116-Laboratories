import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";

//PAGES
import Tasks from "./pages/Tasks.jsx";
import Today from "./pages/Today.jsx";
import Calendar from "./pages/Calendar.jsx";
import ByCategory from "./pages/ByCategory.jsx";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-60 p-5 flex-1 transition-all duration-300">
          <Routes>
            <Route path="/">
              <Route index element={<Tasks />} />
            </Route>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/category/:categoryId" element={<ByCategory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
