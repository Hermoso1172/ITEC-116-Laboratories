import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

// COMPONENT
import Sidebar from "./components/sidebar";

// PAGES
import Discover from "./pages/discover";
import Categories from "./pages/categories";
import Books from "./pages/books";
import Authors from "./pages/authors";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen text-gray-800">
        <Sidebar />
        <div className="flex-1 py-6 px-8 overflow-y-auto">
          <Routes>
            <Route index element={<Discover />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<Authors />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;