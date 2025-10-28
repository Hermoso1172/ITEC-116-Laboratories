import './App.css';
import Signup from '../pages/signup';
import Login from '../pages/login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="login" element={<Login />} />

       
      </Routes>
    </Router>
  );
}

export default App;