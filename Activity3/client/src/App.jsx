import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'

// PAGES
import Discover from './pages/discover'

function App() {
 

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Discover />}></Route>
        {/* Shared layout */}
        
      </Routes>
    </Router>
    </>
  )
}

export default App
