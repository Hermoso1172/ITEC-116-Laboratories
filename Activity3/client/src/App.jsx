import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// COMPONENT
import Sidebar from "./components/sidebar";

// PAGES
import Discover from "./pages/discover";
import Categories from "./pages/categories";
import Books from "./pages/books";
import Authors from "./pages/authors";
import AuthorsProfile from "./pages/authorsProfile";

import { useState } from "react";
import CategoriesProfile from "./pages/categoriesProfile";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <Router>
      <div className="flex min-h-screen text-gray-800">
        {/* Sidebar only shows when showSidebar === true */}
        {showSidebar && <Sidebar />}

        <div className="flex-1 py-6 px-8 overflow-y-auto">
          <Routes>
            <Route
              index
              element={<Discover setShowSidebar={setShowSidebar} />}
            />
            <Route
              path="/categories"
              element={<Categories setShowSidebar={setShowSidebar} />}
            />
            <Route
              path="/categories/:id"
              element={<CategoriesProfile setShowSidebar={setShowSidebar} />}
            />
            <Route
              path="/books"
              element={<Books setShowSidebar={setShowSidebar} />}
            />
            <Route
              path="/authors"
              element={<Authors setShowSidebar={setShowSidebar} />}
            />
            <Route
              path="/authors/:id"
              element={<AuthorsProfile setShowSidebar={setShowSidebar} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
