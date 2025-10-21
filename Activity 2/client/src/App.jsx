import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Firstpage from "./pages/firstpage";
import Trashpage from "./pages/trashpage";
import Login from "./pages/login"
import Editpage from "./pages/editpage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Shared layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Firstpage />} />
          <Route path="trash" element={<Trashpage />} />
          <Route path="/edit/:id" element={<Editpage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
